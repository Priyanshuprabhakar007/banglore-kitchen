import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Sparkles, 
  Flame, 
  Star, 
  Utensils, 
  X, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../../lib/CartContext';
import { ProductImage } from '../../components/ProductImage';
import { Link } from 'react-router-dom';

export function CustomerMenu() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'veg' | 'non-veg' | 'spicy' | 'price-low' | 'price-high'>('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  const { items: cartItems, addToCart, updateQuantity, totalPrice, totalItems } = useCart();

  // Create quick lookup map for item quantities in cart
  const cartQuantityMap = useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach(i => {
      map[i.id] = i.quantity;
    });
    return map;
  }, [cartItems]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Real-time Firestore sync for menu items & categories
  useEffect(() => {
    setLoading(true);
    const qItems = query(collection(db, 'menuItems'), where('isAvailable', '==', true));
    const unsubscribeItems = onSnapshot(qItems, (snapshot) => {
      const menuData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(menuData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching menu items:", error);
      setLoading(false);
    });

    const qCats = query(collection(db, 'categories'), orderBy('order', 'asc'));
    const unsubscribeCats = onSnapshot(qCats, (snapshot) => {
      const catData = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((c: any) => c.isActive !== false);

      setCategories([{ id: 'all', name: 'All Items' }, { id: 'bestseller', name: 'Bestsellers' }, { id: 'chefs', name: "Chef's Specials" }, ...catData]);
    }, (error) => {
      console.error("Error fetching categories:", error);
    });

    return () => {
      unsubscribeItems();
      unsubscribeCats();
    };
  }, []);

  // Autocomplete search suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    
    return items.filter(item => {
      const catName = categories.find(c => c.id === item.categoryId)?.name || '';
      return (
        item.name?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        catName.toLowerCase().includes(term)
      );
    }).slice(0, 6);
  }, [searchTerm, items, categories]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.min(prev + 1, searchSuggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < searchSuggestions.length) {
        handleSelectSuggestion(searchSuggestions[highlightedIndex]);
      } else {
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (item: any) => {
    setSearchTerm(item.name);
    setActiveCategory('all');
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  // Structured Data Schema for SEO
  const schemaOrgJSONLD = useMemo(() => {
    if (!items.length || !categories.length) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Menu",
      "name": "The Bangalore Kitchen Menu",
      "hasMenuSection": categories.filter(c => c.id !== 'all').map(cat => ({
        "@type": "MenuSection",
        "name": cat.name,
        "hasMenuItem": items.filter(item => item.categoryId === cat.id).map(item => ({
          "@type": "MenuItem",
          "name": item.name,
          "description": item.description || `Authentic ${item.name}`,
          "offers": {
            "@type": "Offer",
            "price": item.price,
            "priceCurrency": "USD"
          },
          "image": item.imageUrl || undefined
        }))
      }))
    };
  }, [items, categories]);

  // Filtering & Sorting Logic
  const filteredItems = useMemo(() => {
    let result = items.filter(item => {
      const matchesCategory = 
        activeCategory === 'all' ? true :
        activeCategory === 'bestseller' ? (item.isBestseller === true) :
        activeCategory === 'chefs' ? (item.isChefsSpecial === true) :
        item.categoryId === activeCategory;
      const matchesSearch = !searchTerm || 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesFilter = true;
      if (selectedFilter === 'veg') matchesFilter = item.isVegetarian === true;
      if (selectedFilter === 'non-veg') matchesFilter = item.isVegetarian === false;
      if (selectedFilter === 'spicy') matchesFilter = item.name?.toLowerCase().includes('spicy') || item.name?.toLowerCase().includes('chilli') || item.name?.toLowerCase().includes('chilly') || item.description?.toLowerCase().includes('spicy');

      return matchesCategory && matchesSearch && matchesFilter;
    });

    if (selectedFilter === 'price-low') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (selectedFilter === 'price-high') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [items, activeCategory, searchTerm, selectedFilter]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 pb-28">
      <Helmet>
        <title>South Indian Restaurant Menu in Jersey City | The Bangalore Kitchen</title>
        <meta name="description" content="Explore authentic South Indian dishes, dosas, biryanis, curries, appetizers and chef specials at The Bangalore Kitchen in Jersey City. Order online or reserve your table today." />
        {schemaOrgJSONLD && (
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgJSONLD)}
          </script>
        )}
      </Helmet>

      {/* Luxury Hero Banner (Approx 320px) */}
      <section className="relative h-[320px] md:h-[360px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/home/hero-banner.webp" 
            alt="Authentic South Indian Dining" 
            className="w-full h-full object-cover object-center brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120]/95 via-[#0B1120]/80 to-[#0B1120]/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBF9F5] via-transparent to-[#0B1120]/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-md shadow-md">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              AUTHENTIC SOUTH INDIAN CUISINE
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight mb-3 drop-shadow-md">
              Our Menu
            </h1>
            <p className="text-base md:text-lg text-stone-200 leading-relaxed font-sans max-w-xl opacity-90">
              Authentic South Indian flavours, bold spices & timeless recipes — freshly prepared for every table.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Category Navigation */}
      <div className="sticky top-16 z-30 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-amber-900/10 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 overflow-x-auto hide-scrollbar py-1 scroll-smooth">
            {categories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSearchTerm('');
                  }}
                  className={`px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-all duration-200 text-sm flex items-center gap-2 cursor-pointer shrink-0 ${
                    isActive 
                      ? 'bg-[#0B1120] text-amber-400 font-semibold shadow-md ring-1 ring-amber-400/40 scale-102' 
                      : 'bg-white text-stone-700 hover:bg-amber-100/60 border border-stone-200/80 shadow-2xs'
                  }`}
                >
                  {cat.id === 'all' && <Sparkles size={15} className={isActive ? 'text-amber-400' : 'text-amber-600'} />}
                  {cat.name.toLowerCase().includes('dosa') && <Flame size={15} className={isActive ? 'text-amber-400' : 'text-amber-600'} />}
                  {cat.name.toLowerCase().includes('biryani') && <Star size={15} className={isActive ? 'text-amber-400' : 'text-amber-600'} />}
                  {cat.name.toLowerCase().includes('south') && <Utensils size={15} className={isActive ? 'text-amber-400' : 'text-amber-600'} />}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Search & Sorting Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-8">
          {/* Autocomplete Search Input */}
          <div className="relative flex-1" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
              <input 
                type="text" 
                placeholder="Search dishes, curries, dosas, biryanis..." 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                  setHighlightedIndex(-1);
                }}
                onFocus={() => {
                  if (searchTerm.trim()) setShowSuggestions(true);
                }}
                onKeyDown={handleKeyDown}
                className="w-full pl-12 pr-10 py-3.5 bg-white border border-stone-200/90 rounded-2xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all shadow-sm text-stone-800 text-base"
              />
              {searchTerm && (
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {showSuggestions && searchTerm.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden z-50">
                {searchSuggestions.length > 0 ? (
                  <ul className="max-h-[360px] overflow-y-auto divide-y divide-stone-50">
                    {searchSuggestions.map((item, index) => {
                      const catName = categories.find(c => c.id === item.categoryId)?.name || '';
                      return (
                        <li 
                          key={item.id}
                          onClick={() => handleSelectSuggestion(item)}
                          onMouseEnter={() => setHighlightedIndex(index)}
                          className={`p-3.5 cursor-pointer flex items-center gap-4 transition-colors ${
                            highlightedIndex === index ? 'bg-amber-50/70' : 'hover:bg-stone-50'
                          }`}
                        >
                          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                            <ProductImage src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif font-bold text-stone-900 truncate">{item.name}</h4>
                            <p className="text-xs text-stone-500 truncate">{catName}</p>
                          </div>
                          <div className="font-bold text-[#0B1120] text-sm whitespace-nowrap">
                            ${Number(item.price).toFixed(2)}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-stone-500 text-sm">
                    No matching dishes found.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Filter & Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative w-full md:w-auto">
              <select
                value={selectedFilter}
                onChange={(e: any) => setSelectedFilter(e.target.value)}
                className="w-full md:w-auto appearance-none bg-white border border-stone-200/90 rounded-2xl px-4 py-3.5 pr-10 text-sm font-medium text-stone-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 cursor-pointer"
              >
                <option value="all">Sort & Filter: All Dishes</option>
                <option value="veg">🟢 Vegetarian Only</option>
                <option value="non-veg">🔴 Non-Vegetarian Only</option>
                <option value="spicy">🔥 Spicy Specials</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Skeleton Loaders State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-xs animate-pulse">
                <div className="h-48 bg-stone-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-stone-200 rounded w-3/4"></div>
                  <div className="h-4 bg-stone-100 rounded w-full"></div>
                  <div className="h-4 bg-stone-100 rounded w-2/3"></div>
                  <div className="h-10 bg-stone-200 rounded-xl w-full pt-2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl p-8 border border-stone-200/60 shadow-sm max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-amber-100/60 text-amber-700 flex items-center justify-center mx-auto mb-4">
              <Utensils size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">No dishes found</h3>
            <p className="text-stone-500 text-sm mb-6">Try searching another dish name or clearing your active filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchTerm('');
                setSelectedFilter('all');
              }}
              className="px-6 py-2.5 bg-[#0B1120] text-amber-400 rounded-full font-medium text-sm hover:bg-stone-800 transition-colors shadow-md"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          /* Dish Cards Grid (4 per row on Desktop) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => {
              const qtyInCart = cartQuantityMap[item.id] || 0;
              const isBestseller = item.isBestseller === true;
              const isChefSpecial = item.isChefsSpecial === true;

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.03, 0.3) }}
                  key={item.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col border border-stone-200/70 hover:-translate-y-1.5"
                >
                  {/* Food Image Area (4:3 ratio) */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <ProductImage 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Veg / Non-Veg Indicator Top-Left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {item.isVegetarian ? (
                        <div className="bg-white/90 backdrop-blur-md p-1 rounded-md shadow-xs border border-stone-200/50">
                          <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center rounded-2xs">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white/90 backdrop-blur-md p-1 rounded-md shadow-xs border border-stone-200/50">
                          <div className="w-4 h-4 border-2 border-red-600 flex items-center justify-center rounded-2xs">
                            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                          </div>
                        </div>
                      )}
                      {item.isJain && (
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-1 rounded shadow-xs tracking-wider">
                          JAIN
                        </span>
                      )}
                    </div>

                    {/* Optional Gold Badges Top-Right */}
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                      {isChefSpecial && (
                        <span className="bg-[#0B1120] text-amber-400 border border-amber-400/40 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wider uppercase backdrop-blur-md">
                          CHEF'S SPECIAL
                        </span>
                      )}
                      {isBestseller && (
                        <span className="bg-amber-400 text-stone-950 font-bold text-[10px] px-2.5 py-1 rounded-full shadow-md tracking-wider uppercase">
                          BESTSELLER
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="font-serif font-bold text-lg text-stone-900 line-clamp-1 leading-snug group-hover:text-amber-700 transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-bold text-[#0B1120] text-lg shrink-0">
                          ${Number(item.price).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-stone-500 text-xs leading-relaxed line-clamp-2 mb-4">
                        {item.description || `Authentic ${item.name} prepared fresh with traditional herbs and spices.`}
                      </p>
                    </div>

                    {/* Add to Cart / Quantity Stepper Button */}
                    <div className="pt-2">
                      {qtyInCart > 0 ? (
                        <div className="flex items-center justify-between bg-[#0B1120] text-white rounded-xl p-1 shadow-md">
                          <button
                            onClick={() => updateQuantity(item.id, qtyInCart - 1)}
                            className="w-8 h-8 rounded-lg bg-stone-800 text-amber-400 flex items-center justify-center hover:bg-stone-700 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-bold text-amber-400 text-sm px-3">
                            {qtyInCart}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center hover:bg-amber-400 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => addToCart(item)}
                          className="w-full py-2.5 rounded-xl border border-stone-900 bg-white text-stone-900 font-bold hover:bg-[#0B1120] hover:text-white hover:border-[#0B1120] transition-all duration-200 flex items-center justify-center gap-2 group/btn text-sm shadow-xs"
                        >
                          <ShoppingBag size={16} className="text-amber-600 group-hover/btn:text-amber-400 transition-colors" />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Cart Widget (Desktop Bottom-Right) */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 hidden md:block"
          >
            <Link
              to="/checkout"
              className="flex items-center gap-4 bg-[#0B1120] text-white p-4 px-6 rounded-2xl shadow-2xl border border-amber-400/40 hover:scale-105 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                {totalItems}
              </div>
              <div className="text-left">
                <p className="text-xs text-stone-300 font-medium">Cart Total</p>
                <p className="text-lg font-bold text-amber-400">${totalPrice.toFixed(2)}</p>
              </div>
              <div className="pl-2 flex items-center gap-1 font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                View Cart <ArrowRight size={18} />
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Mobile Cart Bar */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0B1120] border-t border-amber-400/30 p-3 px-4 shadow-2xl"
          >
            <Link
              to="/checkout"
              className="flex items-center justify-between bg-amber-500 text-stone-950 p-3 px-5 rounded-xl font-bold text-base shadow-lg active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-2">
                <span className="bg-stone-950 text-amber-400 px-2.5 py-0.5 rounded-md text-xs">
                  {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                </span>
                <span>View Cart</span>
              </div>
              <div className="flex items-center gap-2">
                <span>${totalPrice.toFixed(2)}</span>
                <ArrowRight size={18} />
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


import fs from 'fs';

let content = fs.readFileSync('src/pages/customer/Menu.tsx', 'utf-8');

// Add new imports
content = content.replace(
  "import React, { useState, useEffect } from 'react';",
  "import React, { useState, useEffect, useRef, useMemo } from 'react';"
);

// Add refs and state
content = content.replace(
  "const [searchTerm, setSearchTerm] = useState('');",
  `const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

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
    }).slice(0, 8);
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
`
);

// Replace the UI structure
const oldUi = `        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-4 justify-between items-center mb-12 border border-gray-100">
          <div className="relative w-full md:w-80 flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for dishes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-bangalore-primary outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={\`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all text-sm \${
                  activeCategory === cat.id 
                    ? 'bg-bangalore-primary text-white shadow-md' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }\`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>`;

const newUi = `        {/* Category Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex gap-2 overflow-x-auto w-full pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchTerm('');
                }}
                className={\`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all text-sm \${
                  activeCategory === cat.id 
                    ? 'bg-bangalore-primary text-white shadow-md' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }\`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar with Autocomplete */}
        <div className="relative mb-12" ref={searchRef}>
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for dishes..." 
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
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-bangalore-primary outline-none transition-all shadow-sm text-gray-800 text-lg"
            />
          </div>
          
          {/* Autocomplete Dropdown */}
          {showSuggestions && searchTerm.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
              {searchSuggestions.length > 0 ? (
                <ul className="max-h-[400px] overflow-y-auto">
                  {searchSuggestions.map((item, index) => {
                    const catName = categories.find(c => c.id === item.categoryId)?.name || '';
                    return (
                      <li 
                        key={item.id}
                        onClick={() => handleSelectSuggestion(item)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        className={\`p-4 cursor-pointer flex items-center gap-4 border-b border-gray-50 last:border-0 transition-colors \${
                          highlightedIndex === index ? 'bg-orange-50' : 'hover:bg-gray-50'
                        }\`}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                          <ProductImage src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
                          <p className="text-sm text-gray-500 truncate">{catName}</p>
                        </div>
                        <div className="font-bold text-bangalore-primary whitespace-nowrap">
                          \${item.price}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p>No dishes found</p>
                </div>
              )}
            </div>
          )}
        </div>`;

content = content.replace(oldUi, newUi);
fs.writeFileSync('src/pages/customer/Menu.tsx', content);
console.log('Menu patched');

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Plus, Search, Edit2, Trash2, Filter, Image as ImageIcon, Upload, Loader2, RefreshCw, CheckCircle2, Sparkles, Star, Flame } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { ProductImage } from '../components/ProductImage';
import { syncReferenceMenu, SyncSummary } from '../services/menuSyncService';

export function MenuManagement() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightFilter, setHighlightFilter] = useState<'all' | 'bestseller' | 'chefs' | 'both' | 'none'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [imageSearchModalOpen, setImageSearchModalOpen] = useState(false);
  const [imageSearchQuery, setImageSearchQuery] = useState('');
  const [imageSearchResults, setImageSearchResults] = useState<string[]>([]);
  const [imageSearchLoading, setImageSearchLoading] = useState(false);
  const [imageSearchTargetId, setImageSearchTargetId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncSummary | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: 'north-indian',
    isVegetarian: true,
    isJain: false,
    isAvailable: true,
    isBestseller: false,
    isChefsSpecial: false,
    imageUrl: ''
  });

  const [categories, setCategories] = useState<any[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const q = query(collection(db, 'menuItems'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const menuData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(menuData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching menu items:", error);
      setLoading(false);
    });

    const qCat = query(collection(db, 'categories'), orderBy('order', 'asc'));
    const unsubscribeCat = onSnapshot(qCat, (snapshot) => {
      setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribe();
      unsubscribeCat();
    };
  }, []);

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description || '',
        price: item.price.toString(),
        categoryId: item.categoryId || 'north-indian',
        isVegetarian: item.isVegetarian ?? true,
        isJain: item.isJain ?? false,
        isAvailable: item.isAvailable ?? true,
        isBestseller: item.isBestseller ?? false,
        isChefsSpecial: item.isChefsSpecial ?? false,
        imageUrl: item.imageUrl || ''
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        categoryId: 'north-indian',
        isVegetarian: true,
        isJain: false,
        isAvailable: true,
        isBestseller: false,
        isChefsSpecial: false,
        imageUrl: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const url = await StorageService.uploadFile(file, 'menu');
      setFormData(prev => ({ ...prev, imageUrl: url }));
    } catch (error: any) {
      console.error("Error uploading image:", error);
      alert(error.message || "Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFindBetterImage = async (item: any) => {
    setImageSearchTargetId(item.id);
    const query = item.name;
    setImageSearchQuery(query);
    setImageSearchModalOpen(true);
    setImageSearchLoading(true);
    setImageSearchResults([]);
    
    try {
      const res = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url&format=json&origin=*`);
      const data = await res.json();
      const pages = data.query?.pages;
      if (pages) {
        const urls = Object.values(pages).map((p: any) => p.imageinfo?.[0]?.url).filter(Boolean);
        setImageSearchResults(urls);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setImageSearchLoading(false);
    }
  };

  const handleSelectSearchedImage = async (url: string) => {
    if (!imageSearchTargetId) return;
    try {
      await updateDoc(doc(db, 'menuItems', imageSearchTargetId), {
        imageUrl: url,
        imageSource: 'automatic',
        imageNeedsReview: false
      });
      setImageSearchModalOpen(false);
    } catch (error) {
      console.error("Error updating image", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSave = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        categoryId: formData.categoryId,
        isVegetarian: formData.isVegetarian,
        isJain: formData.isJain,
        isAvailable: formData.isAvailable,
        isBestseller: formData.isBestseller,
        isChefsSpecial: formData.isChefsSpecial,
        imageUrl: formData.imageUrl,
        imageSource: 'manual',
        imageNeedsReview: false,
        updatedAt: serverTimestamp()
      };

      if (editingItem) {
        await updateDoc(doc(db, 'menuItems', editingItem.id), dataToSave);
      } else {
        await addDoc(collection(db, 'menuItems'), {
          ...dataToSave,
          createdAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving menu item:", error);
      alert("Failed to save item. Check permissions.");
    }
  };

  const handleDelete = async () => {
    if (confirmDeleteId) {
      try {
        const itemToDelete = items.find(i => i.id === confirmDeleteId);
        if (itemToDelete?.imageUrl && itemToDelete.imageUrl.includes('firebasestorage')) {
          await StorageService.deleteFile(itemToDelete.imageUrl);
        }
        await deleteDoc(doc(db, 'menuItems', confirmDeleteId));
        setConfirmDeleteId(null);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'menuItems', id), { isAvailable: !currentStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const toggleBestseller = async (id: string, current: boolean) => {
    try {
      await updateDoc(doc(db, 'menuItems', id), { isBestseller: !current });
      showToast("Bestseller status updated successfully.");
    } catch (error) {
      console.error("Error updating bestseller status:", error);
    }
  };

  const toggleChefsSpecial = async (id: string, current: boolean) => {
    try {
      await updateDoc(doc(db, 'menuItems', id), { isChefsSpecial: !current });
      showToast("Chef's Special status updated successfully.");
    } catch (error) {
      console.error("Error updating chef special status:", error);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoryId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesHighlight = true;
    if (highlightFilter === 'bestseller') matchesHighlight = item.isBestseller === true;
    if (highlightFilter === 'chefs') matchesHighlight = item.isChefsSpecial === true;
    if (highlightFilter === 'both') matchesHighlight = item.isBestseller === true && item.isChefsSpecial === true;
    if (highlightFilter === 'none') matchesHighlight = !item.isBestseller && !item.isChefsSpecial;

    return matchesSearch && matchesHighlight;
  });

  const handleSyncMenu = async () => {
    try {
      setIsSyncing(true);
      const summary = await syncReferenceMenu();
      setSyncResult(summary);
      setIsSyncModalOpen(true);
    } catch (error: any) {
      console.error("Error syncing menu:", error);
      alert(`Sync failed: ${error.message || "Unknown error"}`);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-[#0B1120] text-amber-400 px-4 py-3 rounded-xl shadow-2xl border border-amber-400/40 flex items-center gap-2 font-medium text-sm"
          >
            <CheckCircle2 size={18} className="text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage dishes, prices, availability, and highlight badges.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSyncMenu}
            disabled={isSyncing}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 text-sm"
            title="Synchronize menu with official bangalorekitchen.com menu"
          >
            <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} />
            {isSyncing ? "Syncing Menu..." : "Sync Reference Menu"}
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-bangalore-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-bangalore-primary transition-colors flex items-center gap-2 shadow-sm text-sm"
          >
            <Plus size={16} />
            Add New Dish
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bangalore-primary/20 focus:border-bangalore-primary transition-all text-sm"
            />
          </div>
          
          {/* Admin Highlight Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={highlightFilter}
              onChange={(e: any) => setHighlightFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="all">Highlight Status: All Dishes</option>
              <option value="bestseller">★ Bestsellers Only</option>
              <option value="chefs">👨‍🍳 Chef's Specials Only</option>
              <option value="both">Both Bestseller & Chef's Special</option>
              <option value="none">No Highlight Badge</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="p-4 font-medium w-16">Image</th>
                <th className="p-4 font-medium">Dish Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Tags</th>
                <th className="p-4 font-medium">Highlights</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500">Loading menu items...</td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500">No items found matching filter.</td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="p-4">
                      <div className="relative">
                        <ProductImage 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0" 
                        />
                        {item.imageNeedsReview && (
                          <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-white" title="Image Needs Review">
                            !
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">{item.description}</p>
                    </td>
                    <td className="p-4 text-gray-600 capitalize text-sm">
                      {categories.find(c => c.id === item.categoryId)?.name || item.categoryId?.replace('-', ' ')}
                    </td>
                    <td className="p-4 font-medium text-gray-900 text-sm">${Number(item.price).toFixed(2)}</td>
                    
                    {/* Tags Column */}
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {item.isVegetarian ? (
                          <span className="w-3.5 h-3.5 rounded-sm border border-green-600 flex items-center justify-center" title="Vegetarian">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                          </span>
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-sm border border-red-600 flex items-center justify-center" title="Non-Vegetarian">
                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                          </span>
                        )}
                        {item.isJain && <span className="text-[10px] bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded font-medium">Jain</span>}
                      </div>
                    </td>

                    {/* Highlights Column with Quick Toggles */}
                    <td className="p-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          onClick={() => toggleBestseller(item.id, !!item.isBestseller)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                            item.isBestseller 
                              ? 'bg-amber-400 text-stone-950 shadow-xs ring-1 ring-amber-500/50' 
                              : 'bg-gray-100 text-gray-400 hover:bg-amber-100 hover:text-amber-700'
                          }`}
                          title="Click to toggle Bestseller"
                        >
                          ★ Bestseller
                        </button>

                        <button
                          onClick={() => toggleChefsSpecial(item.id, !!item.isChefsSpecial)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                            item.isChefsSpecial 
                              ? 'bg-[#0B1120] text-amber-400 shadow-xs ring-1 ring-amber-400/50' 
                              : 'bg-gray-100 text-gray-400 hover:bg-stone-800 hover:text-white'
                          }`}
                          title="Click to toggle Chef's Special"
                        >
                          👨‍🍳 Chef's Special
                        </button>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="p-4">
                      <button 
                        onClick={() => toggleAvailability(item.id, item.isAvailable)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${item.isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${item.isAvailable ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                    </td>
                    
                    {/* Actions Column */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleFindBetterImage(item)} className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors" title="Find Better Image">
                          <ImageIcon size={16} />
                        </button>
                        <button onClick={() => handleOpenModal(item)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit Dish">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => setConfirmDeleteId(item.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete Dish">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Delete Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-500 mb-6 text-sm">Are you sure you want to delete this dish? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDeleteId(null)} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">Delete</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add / Edit Dish Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-serif font-bold text-gray-900">{editingItem ? 'Edit Dish' : 'Add New Dish'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Dish Name *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bangalore-primary/20 focus:border-bangalore-primary outline-none text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Price ($) *</label>
                  <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bangalore-primary/20 focus:border-bangalore-primary outline-none text-sm" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bangalore-primary/20 focus:border-bangalore-primary outline-none text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bangalore-primary/20 focus:border-bangalore-primary outline-none text-sm">
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                    <option value="north-indian">North Indian (Legacy)</option>
                    <option value="south-indian">South Indian (Legacy)</option>
                    <option value="chinese">Chinese (Legacy)</option>
                    <option value="snacks">Snacks (Legacy)</option>
                    <option value="thali">Thali (Legacy)</option>
                    <option value="desserts">Desserts (Legacy)</option>
                    <option value="beverages">Beverages (Legacy)</option>
                  </select>
                </div>
                
                {/* Image Upload Area */}
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Image</label>
                  <div className="mt-1 flex items-center gap-4">
                    {formData.imageUrl && (
                      <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-bangalore-primary hover:text-bangalore-primary transition-colors disabled:opacity-50 text-sm"
                      >
                        {uploadingImage ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                        {uploadingImage ? 'Uploading...' : 'Upload Image'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlight Dish Section (Bestseller & Chef's Special Toggles) */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <Sparkles size={16} className="text-amber-500" /> Highlight Dish Status
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Bestseller Toggle */}
                  <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                        <Star size={14} className="text-amber-500 fill-amber-500" /> Bestseller
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Mark as one of the most popular dishes</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, isBestseller: !prev.isBestseller }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.isBestseller ? 'bg-amber-500' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isBestseller ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  {/* Chef's Special Toggle */}
                  <div className="p-3.5 bg-stone-900/5 border border-stone-900/15 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                        <Flame size={14} className="text-amber-600" /> Chef's Special
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Highlight as specially recommended by chef</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, isChefsSpecial: !prev.isChefsSpecial }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.isChefsSpecial ? 'bg-[#0B1120]' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isChefsSpecial ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags & Availability */}
              <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isVegetarian} onChange={e => setFormData({...formData, isVegetarian: e.target.checked})} className="rounded text-bangalore-primary focus:ring-bangalore-primary" />
                  <span className="text-sm font-medium text-gray-700">Vegetarian (Green Dot)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isJain} onChange={e => setFormData({...formData, isJain: e.target.checked})} className="rounded text-bangalore-primary focus:ring-bangalore-primary" />
                  <span className="text-sm font-medium text-gray-700">Jain Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isAvailable} onChange={e => setFormData({...formData, isAvailable: e.target.checked})} className="rounded text-bangalore-primary focus:ring-bangalore-primary" />
                  <span className="text-sm font-medium text-gray-700">In Stock</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-bangalore-primary text-white rounded-lg font-medium hover:bg-bangalore-primary shadow-sm text-sm">Save Dish</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Image Search Modal */}
      {imageSearchModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-xl border border-gray-100 max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Find Better Image</h2>
              <button onClick={() => setImageSearchModalOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                ✕
              </button>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Search Query</label>
              <div className="flex gap-2 mt-1">
                <input 
                  type="text" 
                  value={imageSearchQuery}
                  onChange={(e) => setImageSearchQuery(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bangalore-primary/20 focus:border-bangalore-primary outline-none text-sm"
                  onKeyDown={(e) => { if(e.key === 'Enter') handleFindBetterImage({ id: imageSearchTargetId, name: imageSearchQuery }) }}
                />
                <button 
                  onClick={() => handleFindBetterImage({ id: imageSearchTargetId, name: imageSearchQuery })}
                  className="px-4 py-2 bg-bangalore-primary text-white rounded-lg font-medium flex items-center gap-2 text-sm"
                  disabled={imageSearchLoading}
                >
                  {imageSearchLoading ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
                  Search
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto min-h-[300px]">
              {imageSearchLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Loader2 className="animate-spin mb-2" size={32} />
                  <p className="text-sm">Searching Wikimedia Commons...</p>
                </div>
              ) : imageSearchResults.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-4">
                  {imageSearchResults.map((url, idx) => (
                    <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:ring-4 hover:ring-bangalore-primary/30 transition-all" onClick={() => handleSelectSearchedImage(url)}>
                      <img src={url} alt="Search Result" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-bangalore-primary text-white px-3 py-1.5 rounded-lg text-sm font-semibold">Select</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                  <p>No images found. Try a different search term.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Sync Summary Modal */}
      {isSyncModalOpen && syncResult && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center gap-3 text-emerald-600 mb-4">
              <CheckCircle2 size={28} />
              <h2 className="text-xl font-bold text-gray-900">Menu Synchronization Complete</h2>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              The menu was successfully matched and synchronized with the official live reference menu at <span className="font-semibold text-gray-800">bangalorekitchen.com/menu</span>.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-center">
                <p className="text-2xl font-bold text-emerald-700">{syncResult.addedCount}</p>
                <p className="text-xs text-emerald-600 font-medium">New Items Added</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-center">
                <p className="text-2xl font-bold text-blue-700">{syncResult.updatedCount}</p>
                <p className="text-xs text-blue-600 font-medium">Items Updated</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl text-center">
                <p className="text-2xl font-bold text-gray-700">{syncResult.disabledCount}</p>
                <p className="text-xs text-gray-600 font-medium">Deprecated Items Disabled</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 p-3 rounded-xl text-center">
                <p className="text-2xl font-bold text-purple-700">{syncResult.totalReferenceItems}</p>
                <p className="text-xs text-purple-600 font-medium">Total Reference Dishes</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setIsSyncModalOpen(false)}
                className="bg-bangalore-primary text-white px-5 py-2 rounded-xl font-medium hover:bg-bangalore-primary/90 transition-colors shadow-sm text-sm"
              >
                Close & View Menu
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Plus, Search, Edit2, Trash2, Image as ImageIcon, Upload, Loader2, List } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { ProductImage } from '../components/ProductImage';

export function CategoriesManagement() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Manage Dishes State
  const [managingCategory, setManagingCategory] = useState<any>(null);
  const [allMenuItems, setAllMenuItems] = useState<any[]>([]);
  const [showAddDish, setShowAddDish] = useState(false);
  const [searchExistingDish, setSearchExistingDish] = useState('');
  const [showNewDishForm, setShowNewDishForm] = useState(false);
  const [newDishData, setNewDishData] = useState({
    name: '',
    description: '',
    price: '',
    isVegetarian: true,
    isJain: false,
    isAvailable: true,
    imageUrl: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    const qMenu = query(collection(db, 'menuItems'));
    const unsubscribeMenu = onSnapshot(qMenu, (snapshot) => {
      setAllMenuItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribe();
      unsubscribeMenu();
    };
  }, []);

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ name: item.name, imageUrl: item.imageUrl || '', order: item.order || 0, isActive: item.isActive ?? true });
    } else {
      setEditingItem(null);
      setFormData({ name: '', imageUrl: '', order: categories.length + 1, isActive: true });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const url = await StorageService.uploadFile(file, 'categories');
      setFormData(prev => ({ ...prev, imageUrl: url }));
    } catch (error: any) {
      console.error("Error uploading image:", error);
      alert(error.message || "Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...formData, order: Number(formData.order) };
      if (editingItem) {
        await updateDoc(doc(db, 'categories', editingItem.id), data);
      } else {
        await addDoc(collection(db, 'categories'), data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async () => {
    if (confirmDeleteId) {
      try {
        const categoryToDelete = categories.find(c => c.id === confirmDeleteId);
        if (categoryToDelete?.imageUrl && categoryToDelete.imageUrl.includes('firebasestorage')) {
          await StorageService.deleteFile(categoryToDelete.imageUrl);
        }
        await deleteDoc(doc(db, 'categories', confirmDeleteId));
        setConfirmDeleteId(null);
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const filtered = categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Manage Dishes Handlers
  const categoryDishes = managingCategory ? allMenuItems.filter(item => item.categoryId === managingCategory.id || item.categoryId === managingCategory.name.toLowerCase().replace(/\s+/g, '-')) : [];
  const availableDishes = managingCategory ? allMenuItems.filter(item => item.categoryId !== managingCategory.id && item.categoryId !== managingCategory.name.toLowerCase().replace(/\s+/g, '-')) : [];

  const assignDishToCategory = async (dishId: string) => {
    try {
      await updateDoc(doc(db, 'menuItems', dishId), {
        categoryId: managingCategory.id
      });
    } catch (error) {
      console.error("Error assigning dish:", error);
    }
  };

  const removeDishFromCategory = async (dishId: string) => {
    try {
      await updateDoc(doc(db, 'menuItems', dishId), {
        categoryId: ''
      });
    } catch (error) {
      console.error("Error removing dish:", error);
    }
  };

  const handleCreateNewDish = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSave = {
        name: newDishData.name,
        description: newDishData.description,
        price: parseFloat(newDishData.price),
        categoryId: managingCategory.id,
        isVegetarian: newDishData.isVegetarian,
        isJain: newDishData.isJain,
        isAvailable: newDishData.isAvailable,
        imageUrl: newDishData.imageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await addDoc(collection(db, 'menuItems'), dataToSave);
      setShowNewDishForm(false);
      setNewDishData({
        name: '', description: '', price: '', isVegetarian: true, isJain: false, isAvailable: true, imageUrl: ''
      });
    } catch (error) {
      console.error("Error creating dish:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 text-sm mt-1">Manage menu categories.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-bangalore-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-bangalore-primary flex items-center gap-2">
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search categories..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-bangalore-primary" />
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="p-4 font-medium w-16">Image</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Order</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading...</td></tr> : 
             filtered.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                    {cat.imageUrl ? <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-gray-400" />}
                  </div>
                </td>
                <td className="p-4 font-medium text-gray-900">{cat.name}</td>
                <td className="p-4 text-gray-600">{cat.order}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${cat.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {cat.isActive ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setManagingCategory(cat)} className="bg-bangalore-primary text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-bangalore-primary transition-colors flex items-center gap-1">
                      <Plus size={14} /> Add Dish
                    </button>
                    <button onClick={() => handleOpenModal(cat)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit Category"><Edit2 size={16} /></button>
                    <button onClick={() => setConfirmDeleteId(cat.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete Category"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete this category? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDeleteId(null)} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </motion.div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
              </div>
              <div>
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
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-bangalore-primary hover:text-bangalore-primary transition-colors disabled:opacity-50"
                    >
                      {uploadingImage ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                      {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    </button>
                    <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
                      <span className="w-full border-t border-gray-200"></span>
                      <span className="shrink-0">OR URL</span>
                      <span className="w-full border-t border-gray-200"></span>
                    </div>
                    <input type="url" placeholder="https://..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full p-2 border rounded-lg mt-2 outline-none focus:border-bangalore-primary text-sm" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Display Order</label>
                  <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="rounded text-bangalore-primary" />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg text-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-bangalore-primary text-white rounded-lg">Save</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      {/* Manage Dishes Modal */}
      {managingCategory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Manage Dishes</h2>
                <p className="text-sm text-gray-500">Category: {managingCategory.name}</p>
              </div>
              <button onClick={() => { setManagingCategory(null); setShowAddDish(false); setShowNewDishForm(false); }} className="text-gray-400 hover:text-gray-600">
                <span className="text-2xl leading-none">&times;</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Header Actions */}
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">Current Dishes ({categoryDishes.length})</h3>
                {!showAddDish && !showNewDishForm && (
                  <button onClick={() => setShowAddDish(true)} className="bg-bangalore-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-bangalore-primary flex items-center gap-1">
                    <Plus size={16} /> Add Dish
                  </button>
                )}
              </div>

              {/* Add Dish Section */}
              {showAddDish && !showNewDishForm && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">Add Existing Dish</h4>
                    <button onClick={() => setShowAddDish(false)} className="text-gray-500 hover:text-gray-700 text-sm">Cancel</button>
                  </div>
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search existing dishes..." 
                      value={searchExistingDish}
                      onChange={(e) => setSearchExistingDish(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-bangalore-primary outline-none"
                    />
                  </div>

                  <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg bg-white divide-y divide-gray-100">
                    {availableDishes.filter(d => d.name.toLowerCase().includes(searchExistingDish.toLowerCase())).length === 0 ? (
                      <div className="p-3 text-sm text-gray-500 text-center">No matching dishes found.</div>
                    ) : (
                      availableDishes.filter(d => d.name.toLowerCase().includes(searchExistingDish.toLowerCase())).map(dish => (
                        <div key={dish.id} className="p-2 flex justify-between items-center hover:bg-gray-50">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{dish.name}</p>
                            <p className="text-xs text-gray-500">${dish.price}</p>
                          </div>
                          <button onClick={() => assignDishToCategory(dish.id)} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded font-medium">
                            Add to Category
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Can't find it?</span>
                    <button onClick={() => { setShowNewDishForm(true); setShowAddDish(false); }} className="text-sm text-bangalore-primary font-medium hover:underline">
                      Create Brand New Dish
                    </button>
                  </div>
                </div>
              )}

              {/* Create New Dish Form */}
              {showNewDishForm && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">Create New Dish</h4>
                    <button onClick={() => setShowNewDishForm(false)} className="text-gray-500 hover:text-gray-700 text-sm">Cancel</button>
                  </div>
                  
                  <form onSubmit={handleCreateNewDish} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-700">Dish Name *</label>
                        <input required type="text" value={newDishData.name} onChange={e => setNewDishData({...newDishData, name: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-bangalore-primary" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-700">Price ($) *</label>
                        <input required type="number" value={newDishData.price} onChange={e => setNewDishData({...newDishData, price: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-bangalore-primary" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-700">Description</label>
                      <textarea rows={2} value={newDishData.description} onChange={e => setNewDishData({...newDishData, description: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-bangalore-primary" />
                    </div>
                    
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={newDishData.isVegetarian} onChange={e => setNewDishData({...newDishData, isVegetarian: e.target.checked})} className="rounded text-bangalore-primary" />
                        <span className="text-xs font-medium text-gray-700">Vegetarian</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={newDishData.isJain} onChange={e => setNewDishData({...newDishData, isJain: e.target.checked})} className="rounded text-bangalore-primary" />
                        <span className="text-xs font-medium text-gray-700">Jain</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button type="submit" className="px-4 py-2 bg-bangalore-primary text-white rounded-lg text-sm font-medium hover:bg-bangalore-primary">Save Dish</button>
                    </div>
                  </form>
                </div>
              )}

              {/* List of Dishes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categoryDishes.length === 0 ? (
                  <div className="col-span-full p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-xl">
                    No dishes in this category yet.
                  </div>
                ) : (
                  categoryDishes.map(dish => (
                    <div key={dish.id} className="flex gap-3 p-3 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-white">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                        <ProductImage id={dish.id} src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-900 truncate pr-2">{dish.name}</h4>
                          <button onClick={() => removeDishFromCategory(dish.id)} className="text-gray-400 hover:text-red-500" title="Remove from category">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">${dish.price}</p>
                        <div className="flex gap-1 mt-1">
                          {dish.isVegetarian && <span className="w-2 h-2 rounded-sm border border-green-600 flex items-center justify-center mt-1"><span className="w-1 h-1 bg-green-600 rounded-full"></span></span>}
                          {dish.isJain && <span className="text-[8px] bg-orange-100 text-orange-800 px-1 rounded font-medium">Jain</span>}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

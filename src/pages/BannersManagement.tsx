import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Plus, Edit2, Trash2, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { StorageService } from '../services/storageService';

export function BannersManagement() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    link: '',
    order: 0,
    isActive: true
  });
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'banners'), orderBy('order', 'asc')), (snapshot) => {
      setBanners(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (item: any = null) => {
    setUploadError('');
    if (item) {
      setEditingItem(item);
      setFormData({ title: item.title, imageUrl: item.imageUrl, link: item.link || '', order: item.order || 0, isActive: item.isActive ?? true });
    } else {
      setEditingItem(null);
      setFormData({ title: '', imageUrl: '', link: '', order: banners.length + 1, isActive: true });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');

    // Validation
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Only JPG, PNG and WEBP files are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be less than 5MB.');
      return;
    }

    try {
      console.log("File selected for upload:", file.name, file.size, file.type);
      setUploadingImage(true);
      const url = await StorageService.uploadFile(file, 'banners');
      console.log("Upload completed, URL obtained:", url);
      setFormData(prev => ({ ...prev, imageUrl: url }));
    } catch (error: any) {
      console.error("Error uploading image in BannersManagement:", error);
      setUploadError(`Image upload failed. Please try again.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...formData, order: Number(formData.order) };
      if (editingItem) {
        await updateDoc(doc(db, 'banners', editingItem.id), data);
      } else {
        await addDoc(collection(db, 'banners'), data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving banner:", error);
    }
  };

  const handleDelete = async () => {
    if (confirmDeleteId) {
      try {
        const bannerToDelete = banners.find(b => b.id === confirmDeleteId);
        if (bannerToDelete?.imageUrl && bannerToDelete.imageUrl.includes('firebasestorage')) {
          await StorageService.deleteFile(bannerToDelete.imageUrl);
        }
        await deleteDoc(doc(db, 'banners', confirmDeleteId));
        setConfirmDeleteId(null);
      } catch (error) {
        console.error("Error deleting banner:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Banners & Promotions</h1>
          <p className="text-gray-500 text-sm mt-1">Manage homepage carousel banners.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-bangalore-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-bangalore-primary flex items-center gap-2">
          <Plus size={18} /> Add Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? <p>Loading...</p> : banners.map(banner => (
          <div key={banner.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm relative group">
            <div className="h-48 bg-gray-100 relative">
              {banner.imageUrl ? (
                <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon size={40} /></div>
              )}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleOpenModal(banner)} className="p-2 bg-white rounded-full text-blue-600 shadow-sm hover:scale-110 transition-transform"><Edit2 size={16} /></button>
                <button onClick={() => setConfirmDeleteId(banner.id)} className="p-2 bg-white rounded-full text-red-600 shadow-sm hover:scale-110 transition-transform"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900">{banner.title}</h3>
                <p className="text-sm text-gray-500">Order: {banner.order} {banner.link && `• Link: ${banner.link}`}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold ${banner.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {banner.isActive ? 'ACTIVE' : 'HIDDEN'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete this banner? This action cannot be undone.</p>
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
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Banner' : 'Add Banner'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Title *</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded-lg mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Image</label>
                <div className="mt-1 flex items-center gap-4">
                  {formData.imageUrl && (
                    <div className="w-16 h-16 rounded-lg border bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                      {formData.imageUrl.startsWith('data:') ? (
                        <span className="text-[10px] text-gray-500 text-center px-1">Invalid Format</span>
                      ) : (
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      )}
                    </div>
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/jpeg, image/png, image/webp"
                      className="hidden"
                    />
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg transition-colors disabled:opacity-50
                        ${uploadError ? 'border-red-300 text-red-600 hover:bg-red-50' : 'border-gray-300 text-gray-600 hover:border-bangalore-primary hover:text-bangalore-primary'}`}
                    >
                      {uploadingImage ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                      {uploadingImage ? 'Uploading...' : (formData.imageUrl ? 'Change Image' : 'Upload Image')}
                    </button>
                    {uploadError && (
                      <p className="mt-1 text-xs text-red-600">{uploadError}</p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Link (Optional)</label>
                <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="/offers or /menu" className="w-full p-2 border rounded-lg mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Display Order</label>
                  <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} className="w-full p-2 border rounded-lg mt-1" />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="rounded text-bangalore-primary" />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg text-gray-700">Cancel</button>
                <button type="submit" disabled={uploadingImage || !formData.imageUrl || formData.imageUrl.startsWith('data:')} className="px-4 py-2 bg-bangalore-primary text-white rounded-lg disabled:opacity-50">Save Banner</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

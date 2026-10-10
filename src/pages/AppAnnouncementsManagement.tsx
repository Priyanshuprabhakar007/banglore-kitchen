import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Plus, Edit2, Trash2, Image as ImageIcon, Upload, Loader2, Megaphone, Search } from 'lucide-react';
import { StorageService } from '../services/storageService';

export function AppAnnouncementsManagement() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    imageUrl: '',
    buttonText: '',
    buttonLink: '',
    backgroundColor: '#800000',
    textColor: '#ffffff',
    priority: 0,
    startDate: '',
    endDate: '',
    isActive: true,
    audience: 'all',
    isDismissible: true,
    autoScroll: false
  });

  useEffect(() => {
    const q = query(collection(db, 'appAnnouncements'), orderBy('priority', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAnnouncements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        message: item.message || '',
        imageUrl: item.imageUrl || '',
        buttonText: item.buttonText || '',
        buttonLink: item.buttonLink || '',
        backgroundColor: item.backgroundColor || '#800000',
        textColor: item.textColor || '#ffffff',
        priority: item.priority || 0,
        startDate: item.startDate || '',
        endDate: item.endDate || '',
        isActive: item.isActive ?? true,
        audience: item.audience || 'all',
        isDismissible: item.isDismissible ?? true,
        autoScroll: item.autoScroll ?? false
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        message: '',
        imageUrl: '',
        buttonText: '',
        buttonLink: '',
        backgroundColor: '#800000',
        textColor: '#ffffff',
        priority: 0,
        startDate: '',
        endDate: '',
        isActive: true,
        audience: 'all',
        isDismissible: true,
        autoScroll: false
      });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const url = await StorageService.uploadFile(file, 'announcements');
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
      const data = { 
        ...formData, 
        priority: Number(formData.priority),
        updatedAt: new Date().toISOString()
      };
      
      if (editingItem) {
        await updateDoc(doc(db, 'appAnnouncements', editingItem.id), data);
      } else {
        await addDoc(collection(db, 'appAnnouncements'), {
          ...data,
          createdAt: new Date().toISOString()
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving announcement:", error);
    }
  };

  const handleDelete = async () => {
    if (confirmDeleteId) {
      try {
        const itemToDelete = announcements.find(a => a.id === confirmDeleteId);
        if (itemToDelete?.imageUrl && itemToDelete.imageUrl.includes('firebasestorage')) {
          await StorageService.deleteFile(itemToDelete.imageUrl);
        }
        await deleteDoc(doc(db, 'appAnnouncements', confirmDeleteId));
        setConfirmDeleteId(null);
      } catch (error) {
        console.error("Error deleting announcement:", error);
      }
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'appAnnouncements', id), { isActive: !currentStatus, updatedAt: serverTimestamp() });
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const filtered = announcements.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">App Announcements</h1>
          <p className="text-gray-500 text-sm mt-1">Manage mobile app banner announcements.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-bangalore-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-bangalore-primary flex items-center gap-2">
          <Plus size={18} /> Add Announcement
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search announcements..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-bangalore-primary" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="p-4 font-medium w-16">Image</th>
                <th className="p-4 font-medium">Title & Message</th>
                <th className="p-4 font-medium">Audience</th>
                <th className="p-4 font-medium">Schedule</th>
                <th className="p-4 font-medium">Priority</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? <tr><td colSpan={7} className="p-8 text-center text-gray-500">Loading...</td></tr> : 
               filtered.length === 0 ? <tr><td colSpan={7} className="p-8 text-center text-gray-500">No announcements found.</td></tr> :
               filtered.map((item) => {
                 const now = new Date().toISOString();
                 const isExpired = item.endDate && item.endDate < now;
                 const isPending = item.startDate && item.startDate > now;
                 
                 return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200" style={{ backgroundColor: item.backgroundColor }}>
                        {item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" /> : <Megaphone size={20} style={{ color: item.textColor }} />}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{item.message}</p>
                    </td>
                    <td className="p-4 text-gray-600 capitalize">{item.audience.replace('-', ' ')}</td>
                    <td className="p-4">
                      <div className="text-xs text-gray-600">
                        {item.startDate ? new Date(item.startDate).toLocaleDateString() : 'Now'} - <br/>
                        {item.endDate ? new Date(item.endDate).toLocaleDateString() : 'Forever'}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">{item.priority}</td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 items-start">
                        <button 
                          onClick={() => toggleStatus(item.id, item.isActive)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${item.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${item.isActive ? 'translate-x-4' : 'translate-x-1'}`} />
                        </button>
                        {isExpired && <span className="text-[10px] text-red-500 font-medium">Expired</span>}
                        {isPending && <span className="text-[10px] text-orange-500 font-medium">Pending</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenModal(item)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit"><Edit2 size={16} /></button>
                        <button onClick={() => setConfirmDeleteId(item.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                 );
               })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete this announcement? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDeleteId(null)} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Announcement' : 'Add Announcement'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div className="overflow-y-auto p-6 flex-1">
              <form id="announcement-form" onSubmit={handleSave} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Title *</label>
                      <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Short Message *</label>
                      <textarea required rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Button Text</label>
                        <input type="text" placeholder="e.g. Order Now" value={formData.buttonText} onChange={e => setFormData({...formData, buttonText: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Button Link</label>
                        <input type="text" placeholder="e.g. /menu or https://..." value={formData.buttonLink} onChange={e => setFormData({...formData, buttonLink: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Background Color</label>
                        <div className="flex gap-2 mt-1">
                          <input type="color" value={formData.backgroundColor} onChange={e => setFormData({...formData, backgroundColor: e.target.value})} className="h-10 w-10 rounded border border-gray-300 cursor-pointer p-1" />
                          <input type="text" value={formData.backgroundColor} onChange={e => setFormData({...formData, backgroundColor: e.target.value})} className="flex-1 p-2 border rounded-lg outline-none focus:border-bangalore-primary text-sm uppercase" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Text Color</label>
                        <div className="flex gap-2 mt-1">
                          <input type="color" value={formData.textColor} onChange={e => setFormData({...formData, textColor: e.target.value})} className="h-10 w-10 rounded border border-gray-300 cursor-pointer p-1" />
                          <input type="text" value={formData.textColor} onChange={e => setFormData({...formData, textColor: e.target.value})} className="flex-1 p-2 border rounded-lg outline-none focus:border-bangalore-primary text-sm uppercase" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Image (Optional)</label>
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
                        </div>
                      </div>
                      <input type="url" placeholder="Or paste image URL..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full p-2 border rounded-lg mt-2 outline-none focus:border-bangalore-primary text-sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Audience</label>
                        <select value={formData.audience} onChange={e => setFormData({...formData, audience: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary">
                          <option value="all">All Users</option>
                          <option value="delivery">Delivery Users</option>
                          <option value="takeaway">Takeaway Users</option>
                          <option value="dine-in">Dine-in Users</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Priority (Higher = First)</label>
                        <input type="number" value={formData.priority} onChange={e => setFormData({...formData, priority: Number(e.target.value)})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Start Date & Time</label>
                        <input type="datetime-local" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary text-sm" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">End Date & Time</label>
                        <input type="datetime-local" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary text-sm" />
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="rounded text-bangalore-primary" />
                        <span className="text-sm font-medium text-gray-700">Active (Visible in app)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={formData.isDismissible} onChange={e => setFormData({...formData, isDismissible: e.target.checked})} className="rounded text-bangalore-primary" />
                        <span className="text-sm font-medium text-gray-700">Dismissible (User can close it)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={formData.autoScroll} onChange={e => setFormData({...formData, autoScroll: e.target.checked})} className="rounded text-bangalore-primary" />
                        <span className="text-sm font-medium text-gray-700">Auto-scroll in slider</span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
              <div className="text-xs text-gray-500">
                Preview: A banner with <span className="font-bold" style={{color: formData.backgroundColor}}>this background</span> and <span className="font-bold" style={{color: formData.textColor}}>this text</span>.
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg text-gray-700">Cancel</button>
                <button type="submit" form="announcement-form" className="px-4 py-2 bg-bangalore-primary text-white rounded-lg">Save Announcement</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

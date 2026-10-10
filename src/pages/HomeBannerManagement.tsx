import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { StorageService } from '../services/storageService';
import { ImageIcon, Upload, Loader2, Save, CheckCircle } from 'lucide-react';

export function HomeBannerManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    imageUrl: '',
    tag: 'FAMILY SPECIAL',
    title: 'Authentic Indian meals made for sharing.',
    subtitle: 'Enjoy authentic Indian flavours, dosas, biryanis, and family meals prepared fresh.',
    buttonText: 'Order Now',
    buttonLink: '/menu',
    isActive: true
  });

  useEffect(() => {
    const bannerDocRef = doc(db, 'settings', 'homeBanner');
    const unsubscribe = onSnapshot(bannerDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData(prev => ({
          ...prev,
          ...data
        }));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Only JPG, PNG and WEBP files are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be less than 5MB.');
      return;
    }

    try {
      setUploadingImage(true);
      const url = await StorageService.uploadFile(file, 'banners');
      setFormData(prev => ({ ...prev, imageUrl: url }));
    } catch (error: any) {
      console.error("Error uploading image:", error);
      setUploadError('Image upload failed. Please try again.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    if (formData.buttonText && !formData.buttonLink) return;

    try {
      setSaving(true);
      setSuccessMsg('');
      const bannerDocRef = doc(db, 'settings', 'homeBanner');
      await setDoc(bannerDocRef, formData, { merge: true });
      setSuccessMsg('Home banner updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error("Error saving banner:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-bangalore-primary" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Home Banner Management</h1>
        <p className="text-gray-500 mt-1">Manage the hero banner on the customer home page.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Image Preview & Upload */}
          <div>
            <label className="text-sm font-bold text-gray-900 block mb-3">Banner Image (Recommended: 1080x600)</label>
            <div className="relative border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50 aspect-video max-h-[300px] flex items-center justify-center group">
              {formData.imageUrl ? (
                <>
                   <img src={formData.imageUrl} alt="Banner Preview" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                         type="button" 
                         onClick={() => fileInputRef.current?.click()} 
                         className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium shadow flex items-center gap-2"
                      >
                         <Upload size={18} /> Replace Image
                      </button>
                   </div>
                </>
              ) : (
                <div className="text-center p-6">
                   <ImageIcon size={48} className="mx-auto text-gray-300 mb-3" />
                   <p className="text-gray-500 mb-4">No banner image uploaded.</p>
                   <button 
                     type="button" 
                     onClick={() => fileInputRef.current?.click()} 
                     className="bg-bangalore-primary text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 mx-auto disabled:opacity-50"
                     disabled={uploadingImage}
                   >
                     {uploadingImage ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />} Upload Image
                   </button>
                </div>
              )}
            </div>
            {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/jpeg, image/png, image/webp" 
              className="hidden" 
            />
            {formData.imageUrl && (
               <div className="mt-3 flex justify-end">
                  <button type="button" onClick={() => setFormData({...formData, imageUrl: ''})} className="text-red-500 text-sm font-medium hover:underline">
                    Remove Image
                  </button>
               </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-gray-900 block mb-1">Banner Tag / Label</label>
              <input type="text" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} placeholder="e.g. FAMILY SPECIAL" className="w-full p-3 border rounded-xl outline-none focus:border-bangalore-primary focus:ring-1 focus:ring-bangalore-primary" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-900 block mb-1">Banner Title *</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Authentic Indian meals..." className="w-full p-3 border rounded-xl outline-none focus:border-bangalore-primary focus:ring-1 focus:ring-bangalore-primary" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-bold text-gray-900 block mb-1">Subtitle / Description</label>
              <textarea rows={2} value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} placeholder="e.g. Enjoy authentic Indian flavors..." className="w-full p-3 border rounded-xl outline-none focus:border-bangalore-primary focus:ring-1 focus:ring-bangalore-primary" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-900 block mb-1">Button Text</label>
              <input type="text" value={formData.buttonText} onChange={e => setFormData({...formData, buttonText: e.target.value})} placeholder="e.g. Order Now" className="w-full p-3 border rounded-xl outline-none focus:border-bangalore-primary focus:ring-1 focus:ring-bangalore-primary" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-900 block mb-1">Button Link</label>
              <input type="text" value={formData.buttonLink} required={!!formData.buttonText} onChange={e => setFormData({...formData, buttonLink: e.target.value})} placeholder="e.g. /menu" className="w-full p-3 border rounded-xl outline-none focus:border-bangalore-primary focus:ring-1 focus:ring-bangalore-primary" />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-5 h-5 rounded text-bangalore-primary focus:ring-bangalore-primary" />
              <span className="font-medium text-gray-900">Show Banner on Home Page</span>
            </label>
          </div>

          {successMsg && (
            <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-2">
              <CheckCircle size={20} /> <span className="font-medium">{successMsg}</span>
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={saving || uploadingImage} 
              className="bg-bangalore-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-bangalore-accent transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} 
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Upload, Loader2, Save, Globe, Smartphone, Image as ImageIcon, Settings } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { OFFICIAL_LOGO_PATH, OFFICIAL_SYMBOL_PATH, getCleanLogoUrl } from '../components/ui/Logo';

export function BrandingSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    websiteLogo: OFFICIAL_LOGO_PATH,
    appLogo: OFFICIAL_LOGO_PATH,
    favicon: '/favicon-32x32.png',
    appIcon: OFFICIAL_SYMBOL_PATH,
    restaurantName: 'The Bangalore Kitchen',
    primaryColor: '#800000',
    secondaryColor: '#FFD700'
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const websiteLogoInputRef = useRef<HTMLInputElement>(null);
  const appLogoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const appIconInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'branding'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSettings(prev => ({
          ...prev,
          ...data,
          websiteLogo: getCleanLogoUrl(data.websiteLogo),
          appLogo: getCleanLogoUrl(data.appLogo),
          favicon: data.favicon && !data.favicon.includes('basant') && !data.favicon.startsWith('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOE') ? data.favicon : '/favicon-32x32.png',
          appIcon: data.appIcon && !data.appIcon.includes('basant') && !data.appIcon.startsWith('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOE') ? data.appIcon : OFFICIAL_SYMBOL_PATH,
        }));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(null);

    try {
      setUploading(field);
      const url = await StorageService.uploadFile(file, 'branding');
      setSettings(prev => ({ ...prev, [field]: url }));
      setSuccess(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} uploaded successfully!`);
    } catch (err: any) {
      console.error(`Error uploading ${field}:`, err);
      setError(err.message || `Failed to upload ${field}. Please check your internet connection and try again.`);
    } finally {
      setUploading(null);
      if (e.target) e.target.value = ''; // Reset input
    }
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    try {
      setSaving(true);
      await setDoc(doc(db, 'settings', 'branding'), {
        ...settings,
        updatedAt: serverTimestamp()
      });
      setSuccess('Branding settings saved successfully!');
    } catch (err: any) {
      console.error('Error saving branding settings:', err);
      setError('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-bangalore-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Branding Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your restaurant's visual identity across website and mobile app.</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {error && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-100">
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm border border-green-100">
              {success}
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Website Branding */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-2 text-bangalore-primary font-bold border-b pb-4">
            <Globe size={20} />
            <h2>Website Branding</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Website Logo</label>
              <div className="flex items-center gap-4">
                <div className="w-48 h-20 rounded-xl bg-[#1c221e] border border-stone-700/60 p-2 flex items-center justify-center overflow-hidden shrink-0">
                  {settings.websiteLogo ? (
                    <img src={settings.websiteLogo} alt="Website Logo" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <ImageIcon className="text-gray-500" size={32} />
                  )}
                </div>
                <div className="flex-1">
                  <input 
                    type="file" 
                    ref={websiteLogoInputRef} 
                    onChange={(e) => handleUpload(e, 'websiteLogo')} 
                    className="hidden" 
                    accept="image/*" 
                  />
                  <button 
                    onClick={() => websiteLogoInputRef.current?.click()}
                    disabled={uploading === 'websiteLogo'}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    {uploading === 'websiteLogo' ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                    {uploading === 'websiteLogo' ? 'Uploading...' : 'Upload Logo'}
                  </button>
                  <div className="mt-2">
                    <input 
                      type="text"
                      placeholder="Or paste image URL"
                      value={settings.websiteLogo}
                      onChange={(e) => setSettings(prev => ({ ...prev, websiteLogo: e.target.value }))}
                      className="w-full p-2 border border-gray-100 rounded-lg text-[10px] outline-none focus:border-bangalore-primary"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2">Recommended: PNG or SVG with transparent background. Max 2MB.</p>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Favicon</label>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                  {settings.favicon ? (
                    <img src={settings.favicon} alt="Favicon" className="w-8 h-8 object-contain" />
                  ) : (
                    <ImageIcon className="text-gray-300" size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <input 
                    type="file" 
                    ref={faviconInputRef} 
                    onChange={(e) => handleUpload(e, 'favicon')} 
                    className="hidden" 
                    accept="image/x-icon,image/png" 
                  />
                  <button 
                    onClick={() => faviconInputRef.current?.click()}
                    disabled={uploading === 'favicon'}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    {uploading === 'favicon' ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                    Upload Favicon
                  </button>
                  <div className="mt-2">
                    <input 
                      type="text"
                      placeholder="Or paste favicon URL"
                      value={settings.favicon}
                      onChange={(e) => setSettings(prev => ({ ...prev, favicon: e.target.value }))}
                      className="w-full p-2 border border-gray-100 rounded-lg text-[10px] outline-none focus:border-bangalore-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Branding */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-2 text-bangalore-primary font-bold border-b pb-4">
            <Smartphone size={20} />
            <h2>App Branding</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">App Logo (Splash Screen)</label>
              <div className="flex items-center gap-4">
                <div className="w-48 h-20 rounded-xl bg-[#1c221e] border border-stone-700/60 p-2 flex items-center justify-center overflow-hidden shrink-0">
                  {settings.appLogo ? (
                    <img src={settings.appLogo} alt="App Logo" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <ImageIcon className="text-gray-500" size={32} />
                  )}
                </div>
                <div className="flex-1">
                  <input 
                    type="file" 
                    ref={appLogoInputRef} 
                    onChange={(e) => handleUpload(e, 'appLogo')} 
                    className="hidden" 
                    accept="image/*" 
                  />
                  <button 
                    onClick={() => appLogoInputRef.current?.click()}
                    disabled={uploading === 'appLogo'}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    {uploading === 'appLogo' ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                    {uploading === 'appLogo' ? 'Uploading...' : 'Upload App Logo'}
                  </button>
                  <div className="mt-2">
                    <input 
                      type="text"
                      placeholder="Or paste image URL"
                      value={settings.appLogo}
                      onChange={(e) => setSettings(prev => ({ ...prev, appLogo: e.target.value }))}
                      className="w-full p-2 border border-gray-100 rounded-lg text-[10px] outline-none focus:border-bangalore-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">App Icon</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                  {settings.appIcon ? (
                    <img src={settings.appIcon} alt="App Icon" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="text-gray-300" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <input 
                    type="file" 
                    ref={appIconInputRef} 
                    onChange={(e) => handleUpload(e, 'appIcon')} 
                    className="hidden" 
                    accept="image/png" 
                  />
                  <button 
                    onClick={() => appIconInputRef.current?.click()}
                    disabled={uploading === 'appIcon'}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    {uploading === 'appIcon' ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                    Upload App Icon
                  </button>
                  <div className="mt-2">
                    <input 
                      type="text"
                      placeholder="Or paste app icon URL"
                      value={settings.appIcon}
                      onChange={(e) => setSettings(prev => ({ ...prev, appIcon: e.target.value }))}
                      className="w-full p-2 border border-gray-100 rounded-lg text-[10px] outline-none focus:border-bangalore-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* General Branding */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex items-center gap-2 text-bangalore-primary font-bold border-b pb-4">
          <Settings size={20} />
          <h2>General Branding</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Restaurant Name</label>
            <input 
              type="text" 
              value={settings.restaurantName} 
              onChange={(e) => setSettings(prev => ({ ...prev, restaurantName: e.target.value }))}
              className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:border-bangalore-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Primary Color</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={settings.primaryColor} 
                  onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="w-10 h-10 rounded border border-gray-200 p-1 cursor-pointer"
                />
                <input 
                  type="text" 
                  value={settings.primaryColor} 
                  onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="flex-1 p-2 border border-gray-200 rounded-lg text-sm uppercase"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Secondary Color</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={settings.secondaryColor} 
                  onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="w-10 h-10 rounded border border-gray-200 p-1 cursor-pointer"
                />
                <input 
                  type="text" 
                  value={settings.secondaryColor} 
                  onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="flex-1 p-2 border border-gray-200 rounded-lg text-sm uppercase"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-bangalore-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-bangalore-primary transition-all flex items-center gap-2 shadow-lg shadow-bangalore-primary/20 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Save Branding Settings
        </button>
      </div>
    </div>
  );
}

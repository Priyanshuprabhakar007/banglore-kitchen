import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { StorageService } from "../services/storageService";
import {
  Settings,
  Upload,
  Loader2,
  Save,
  Image as ImageIcon,
} from "lucide-react";

export function SettingsManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    appName: "Bangalore",
    appSubtitle: "Vegetarian",
    logoUrl: "",
    primaryColor: "#800000",
    cloudflareR2AccountId: "",
    cloudflareR2AccessKeyId: "",
    cloudflareR2SecretAccessKey: "",
    cloudflareR2BucketName: "",
    cloudflareR2PublicDomain: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "global");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData((prev) => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const url = await StorageService.uploadFile(file, "settings");
      setFormData((prev) => ({ ...prev, logoUrl: url }));
    } catch (error: any) {
      console.error("Error uploading image:", error);
      alert(error.message || "Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(
        doc(db, "settings", "global"),
        {
          ...formData,
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings.");
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
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
          <Settings size={24} className="text-bangalore-primary" /> System
          Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Configure global application settings, branding, and logos.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">
            Branding & Identity
          </h2>
          <p className="text-sm text-gray-500">
            These settings affect both the customer website and the mobile app.
          </p>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  App Name
                </label>
                <input
                  type="text"
                  value={formData.appName}
                  onChange={(e) =>
                    setFormData({ ...formData, appName: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg mt-1 outline-none focus:border-bangalore-primary"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  App Subtitle
                </label>
                <input
                  type="text"
                  value={formData.appSubtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, appSubtitle: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg mt-1 outline-none focus:border-bangalore-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Primary Color
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) =>
                      setFormData({ ...formData, primaryColor: e.target.value })
                    }
                    className="h-10 w-10 rounded border border-gray-300 cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={formData.primaryColor}
                    onChange={(e) =>
                      setFormData({ ...formData, primaryColor: e.target.value })
                    }
                    className="flex-1 p-2 border border-gray-200 rounded-lg outline-none focus:border-bangalore-primary text-sm uppercase"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  App Logo
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Upload a square image (PNG or JPG). Recommended size:
                  512x512px.
                </p>

                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                    {formData.logoUrl ? (
                      <img
                        src={formData.logoUrl}
                        alt="App Logo"
                        className="w-full h-full object-contain bg-white"
                      />
                    ) : (
                      <ImageIcon size={32} className="text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
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
                      {uploadingImage ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <Upload size={18} />
                      )}
                      {uploadingImage ? "Uploading..." : "Upload New Logo"}
                    </button>

                    {formData.logoUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, logoUrl: "" })
                        }
                        className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove Logo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-bangalore-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-bangalore-primary transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <Upload size={20} className="text-bangalore-primary" />
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Cloudflare R2 Storage Configuration
            </h2>
            <p className="text-sm text-gray-500">
              Configure Cloudflare R2 values for file storage.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Account ID
              </label>
              <input
                type="text"
                value={formData.cloudflareR2AccountId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cloudflareR2AccountId: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-200 rounded-lg mt-1 outline-none focus:border-bangalore-primary"
                placeholder="e.g. 1234567890abcdef"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Bucket Name
              </label>
              <input
                type="text"
                value={formData.cloudflareR2BucketName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cloudflareR2BucketName: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-200 rounded-lg mt-1 outline-none focus:border-bangalore-primary"
                placeholder="e.g. my-app-bucket"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Access Key ID
              </label>
              <input
                type="text"
                value={formData.cloudflareR2AccessKeyId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cloudflareR2AccessKeyId: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-200 rounded-lg mt-1 outline-none focus:border-bangalore-primary"
                placeholder="e.g. abcdef123456"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Secret Access Key
              </label>
              <input
                type="password"
                value={formData.cloudflareR2SecretAccessKey}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cloudflareR2SecretAccessKey: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-200 rounded-lg mt-1 outline-none focus:border-bangalore-primary"
                placeholder="e.g. secretkey123"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Public Domain (Optional)
              </label>
              <input
                type="text"
                value={formData.cloudflareR2PublicDomain}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cloudflareR2PublicDomain: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-200 rounded-lg mt-1 outline-none focus:border-bangalore-primary"
                placeholder="e.g. https://pub-12345.r2.dev"
              />
              <p className="text-xs text-gray-500 mt-1">
                If using a custom domain or mapped R2.dev domain for public
                access.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              disabled={saving}
              onClick={async () => {
                if (window.confirm("Are you sure you want to clear all Cloudflare R2 credentials from the database?")) {
                  try {
                    setSaving(true);
                    const clearedData = {
                      cloudflareR2AccountId: "",
                      cloudflareR2AccessKeyId: "",
                      cloudflareR2SecretAccessKey: "",
                      cloudflareR2BucketName: "",
                      cloudflareR2PublicDomain: "",
                    };
                    await setDoc(doc(db, "settings", "global"), clearedData, { merge: true });
                    setFormData(prev => ({ ...prev, ...clearedData }));
                    alert("R2 Credentials cleared successfully!");
                  } catch (error) {
                    console.error("Error clearing R2 credentials:", error);
                    alert("Failed to clear credentials.");
                  } finally {
                    setSaving(false);
                  }
                }
              }}
              className="bg-white border border-red-200 text-red-600 px-6 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors disabled:opacity-70"
            >
               Clear R2 Credentials
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-bangalore-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-bangalore-primary transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              {saving ? "Saving..." : "Save Storage Configuration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

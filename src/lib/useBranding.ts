import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export interface BrandingSettings {
  websiteLogo: string;
  appLogo: string;
  favicon: string;
  appIcon: string;
  restaurantName: string;
  primaryColor: string;
  secondaryColor: string;
}

const defaultBranding: BrandingSettings = {
  websiteLogo: '',
  appLogo: '',
  favicon: '',
  appIcon: '',
  restaurantName: 'The Bangalore Kitchen',
  primaryColor: '#800000',
  secondaryColor: '#FFD700'
};

export function useBranding() {
  const [branding, setBranding] = useState<BrandingSettings>(defaultBranding);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'branding'), (docSnap) => {
      if (docSnap.exists()) {
        setBranding({ ...defaultBranding, ...docSnap.data() });
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching branding settings:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { branding, loading };
}

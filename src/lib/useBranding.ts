import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { OFFICIAL_LOGO_PATH, OFFICIAL_SYMBOL_PATH, getCleanLogoUrl } from '../components/ui/Logo';

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
  websiteLogo: OFFICIAL_LOGO_PATH,
  appLogo: OFFICIAL_LOGO_PATH,
  favicon: '/favicon-32x32.png',
  appIcon: OFFICIAL_SYMBOL_PATH,
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
        const data = docSnap.data();
        setBranding({
          ...defaultBranding,
          ...data,
          websiteLogo: getCleanLogoUrl(data.websiteLogo),
          appLogo: getCleanLogoUrl(data.appLogo),
          favicon: data.favicon && !data.favicon.includes('basant') && !data.favicon.startsWith('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOE') ? data.favicon : '/favicon-32x32.png',
          appIcon: data.appIcon && !data.appIcon.includes('basant') && !data.appIcon.startsWith('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOE') ? data.appIcon : OFFICIAL_SYMBOL_PATH,
        });
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


import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export interface AppSettings {
  appName: string;
  appSubtitle: string;
  logoUrl: string | null;
  primaryColor: string;
}

const defaultSettings: AppSettings = {
  appName: 'Bangalore',
  appSubtitle: 'Vegetarian',
  logoUrl: null,
  primaryColor: '#800000',
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings({ ...defaultSettings, ...docSnap.data() });
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching settings:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { settings, loading };
}

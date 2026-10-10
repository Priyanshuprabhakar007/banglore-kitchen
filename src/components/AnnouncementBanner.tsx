import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Megaphone } from 'lucide-react';

export function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const now = new Date().toISOString();
    const q = query(
      collection(db, 'appAnnouncements'),
      orderBy('priority', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activeAnnouncements = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((ann: any) => ann.active !== false)
        .filter((ann: any) => {
          const start = ann.startDate || '';
          const end = ann.endDate || '';
          return (!start || start <= now) && (!end || end >= now);
        });
      setAnnouncements(activeAnnouncements);
    }, (error) => {
        console.error("AnnouncementBanner firestore error:", error);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (announcements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [announcements.length]);

  if (!isVisible || announcements.length === 0) return null;

  const current = announcements[currentIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current.id}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        style={{ backgroundColor: current.backgroundColor || '#800000', color: current.textColor || '#ffffff' }}
        className="relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 flex items-center justify-between min-h-[40px]">
          <div className="flex-1 flex items-center justify-center gap-3 text-center">
            <Megaphone size={16} className="shrink-0 hidden sm:block opacity-80" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-bold text-sm uppercase tracking-wider">{current.title}</span>
              <span className="text-sm opacity-90">{current.message}</span>
            </div>
            {current.buttonText && current.buttonLink && (
              <a 
                href={current.buttonLink}
                className="ml-4 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-xs font-bold flex items-center gap-1 whitespace-nowrap"
              >
                {current.buttonText} <ChevronRight size={12} />
              </a>
            )}
          </div>
          
          {current.dismissible && (
            <button 
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-black/10 rounded-full transition-colors shrink-0 ml-4"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

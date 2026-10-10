import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Bell, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotificationToast() {
  const [latestNotification, setLatestNotification] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'notifications'),
      orderBy('createdAt', 'desc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const notif = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        
        // Only show toast if it's a new notification (not on initial load)
        if (!isFirstLoad) {
          setLatestNotification(notif);
          setIsVisible(true);
          
          // Auto-hide after 10 seconds
          const timer = setTimeout(() => {
            setIsVisible(false);
          }, 10000);
          
          return () => clearTimeout(timer);
        }
        setIsFirstLoad(false);
      }
    });

    return () => unsubscribe();
  }, [isFirstLoad]);

  return (
    <AnimatePresence>
      {isVisible && latestNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[100] w-full max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-bangalore-accent/20 overflow-hidden flex shadow-bangalore-primary/10">
            <div className="w-2 bg-bangalore-primary"></div>
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2 text-bangalore-primary">
                  <Bell size={16} className="animate-bounce" />
                  <span className="text-xs font-bold uppercase tracking-wider">New Notification</span>
                </div>
                <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{latestNotification.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{latestNotification.message}</p>
              <Link 
                to="/notifications" 
                onClick={() => setIsVisible(false)}
                className="text-xs font-bold text-bangalore-primary hover:underline"
              >
                View all notifications
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

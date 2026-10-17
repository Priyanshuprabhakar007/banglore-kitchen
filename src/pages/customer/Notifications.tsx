import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Bell, Clock, ChevronRight } from 'lucide-react';

export function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-bangalore-ivory py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-500 mt-1">Stay updated with our latest news, rewards, and special offers.</p>
          </div>
          <div className="w-12 h-12 bg-bangalore-primary/10 text-bangalore-primary rounded-full flex items-center justify-center">
            <Bell size={24} />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bangalore-primary"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell size={40} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No notifications yet</h2>
            <p className="text-gray-500">We'll let you know when we have something exciting to share!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif, idx) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-bangalore-card-alt rounded-2xl p-6 shadow-sm border border-bangalore-border focus-within:border-bangalore-accent hover:border-bangalore-accent/50 transition-all group"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-bangalore-primary/10 text-bangalore-primary flex items-center justify-center shrink-0">
                    <Bell size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">{notif.title}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                       <Clock size={12} />
                       {(() => {
                         if (!notif.createdAt) return 'Recent';
                         try {
                           if (typeof notif.createdAt?.toDate === 'function') {
                             return notif.createdAt.toDate().toLocaleDateString('en-US', {
                               month: 'short',
                               day: 'numeric',
                               year: 'numeric'
                             });
                           }
                           const d = new Date(notif.createdAt);
                           if (!isNaN(d.getTime())) {
                             return d.toLocaleDateString('en-US', {
                               month: 'short',
                               day: 'numeric',
                               year: 'numeric'
                             });
                           }
                         } catch {}
                         return 'Recent';
                       })()}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{notif.message}</p>
                    <div className="mt-4 flex justify-end">
                      <div className="text-bangalore-primary font-bold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

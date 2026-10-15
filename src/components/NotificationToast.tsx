import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Bell, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const DISMISSED_STORAGE_KEY = 'tbk_dismissed_notification_ids';

function getDismissedIds(): Set<string> {
  try {
    const raw = sessionStorage.getItem(DISMISSED_STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveDismissedId(id: string) {
  try {
    const ids = getDismissedIds();
    ids.add(id);
    sessionStorage.setItem(DISMISSED_STORAGE_KEY, JSON.stringify(Array.from(ids)));
  } catch (err) {
    console.error('Failed to save dismissed notification ID:', err);
  }
}

export function NotificationToast() {
  const [latestNotification, setLatestNotification] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialSnapshotRef = useRef(true);
  const knownNotificationIdsRef = useRef<Set<string>>(new Set());

  // Clear dismissal timer safely
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Dismiss notification handler (clears timer, hides toast, marks as dismissed)
  const handleDismiss = useCallback(() => {
    clearTimer();
    setIsVisible(false);
    if (latestNotification?.id) {
      saveDismissedId(latestNotification.id);
    }
  }, [clearTimer, latestNotification]);

  // Listen to notifications from Firestore
  useEffect(() => {
    const q = query(
      collection(db, 'notifications'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // On initial mount, record all existing notification IDs so they aren't displayed as new popups
        if (isInitialSnapshotRef.current) {
          snapshot.docs.forEach((d) => knownNotificationIdsRef.current.add(d.id));
          isInitialSnapshotRef.current = false;
          return;
        }

        // Process real-time changes
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const notifId = change.doc.id;

            // Skip if this doc ID is already known
            if (knownNotificationIdsRef.current.has(notifId)) {
              return;
            }
            knownNotificationIdsRef.current.add(notifId);

            // Skip if user previously dismissed this notification in this session
            const dismissedIds = getDismissedIds();
            if (dismissedIds.has(notifId)) {
              return;
            }

            // Fresh notification arrived: show toast and trigger fresh 2s timer
            const notifData = { id: notifId, ...change.doc.data() };
            setLatestNotification(notifData);
            setIsVisible(true);
          }
        });
      },
      (error) => {
        console.error('NotificationToast onSnapshot error:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Automatic 2-second dismissal timer for each new notification
  useEffect(() => {
    if (!isVisible || !latestNotification) {
      clearTimer();
      return;
    }

    // Reset and start a fresh 2-second timer
    clearTimer();
    timerRef.current = setTimeout(() => {
      handleDismiss();
    }, 2000);

    return () => {
      clearTimer();
    };
  }, [isVisible, latestNotification, clearTimer, handleDismiss]);

  // Clean up any pending timer on component unmount
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const destination = latestNotification?.link || '/notifications';

  const handleCardClick = (e: React.MouseEvent) => {
    // If user clicked close button or link, let their specific handler handle it
    if ((e.target as HTMLElement).closest('button, a')) {
      return;
    }
    handleDismiss();
    navigate(destination);
  };

  return (
    <AnimatePresence>
      {isVisible && latestNotification && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 50, x: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, x: 0 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0, transition: { duration: 0.25 } }
              : { opacity: 0, x: 30, transition: { duration: 0.25, ease: 'easeOut' } }
          }
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-4 sm:right-6 z-[100] w-[calc(100vw-2rem)] sm:w-full sm:max-w-sm"
        >
          <div
            onClick={handleCardClick}
            className="bg-white rounded-2xl shadow-2xl border border-bangalore-accent/20 overflow-hidden flex shadow-bangalore-primary/10 cursor-pointer transition-shadow hover:shadow-bangalore-primary/20"
          >
            <div className="w-2 bg-bangalore-primary shrink-0" />
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2 text-bangalore-primary">
                  <Bell size={16} className="animate-bounce" />
                  <span className="text-xs font-bold uppercase tracking-wider">New Notification</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss();
                  }}
                  aria-label="Close notification"
                  className="text-gray-400 hover:text-gray-600 p-0.5 -mr-1 -mt-1 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{latestNotification.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{latestNotification.message}</p>
              <Link
                to={destination}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDismiss();
                }}
                className="text-xs font-bold text-bangalore-primary hover:underline inline-block"
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

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { QueueToken, QueueSettings } from '../types/queue';
import { Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function QueueDisplay() {
  const { branchId } = useParams();
  const [tokens, setTokens] = useState<QueueToken[]>([]);
  const [settings, setSettings] = useState<QueueSettings | null>(null);
  const [branding, setBranding] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Get branding
    onSnapshot(doc(db, 'settings', 'branding'), (docSnap) => {
      if (docSnap.exists()) {
        setBranding(docSnap.data());
      }
    });

    if (!branchId) return;

    // Listen directly to queue settings
    const settingsRef = doc(db, 'queues', branchId, 'config', 'settings');
    const unsubSettings = onSnapshot(settingsRef, (docSnap) => {
      if (docSnap.exists()) {
        setSettings(docSnap.data() as QueueSettings);
      }
    });

    const tokensRef = collection(db, 'queues', branchId, 'tokens');
    const qTokens = query(tokensRef, orderBy('createdAt', 'asc'));
    const unsubTokens = onSnapshot(qTokens, (snapshot) => {
      const tList: QueueToken[] = [];
      snapshot.forEach(d => tList.push({ id: d.id, ...d.data() } as QueueToken));
      setTokens(tList);
    });

    return () => {
      unsubSettings();
      unsubTokens();
    };
  }, [branchId]);

  const activeTokens = tokens.filter(t => t.status === 'serving' || t.status === 'waiting');
  const currentlyServing = activeTokens.filter(t => t.status === 'serving');
  const waitingList = activeTokens.filter(t => t.status === 'waiting').slice(0, 5); // next 5

  return (
    <div className="min-h-screen bg-bangalore-ivory text-black flex flex-col overflow-hidden font-sans">
      <header className="bg-bangalore-primary text-white p-6 md:p-8 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          {branding?.websiteLogo ? (
             <img src={branding.websiteLogo} alt="Logo" className="h-12 w-auto object-contain bg-white rounded p-1" />
          ) : (
             <div className="w-12 h-12 rounded bg-bangalore-accent flex items-center justify-center">
               <span className="font-serif font-bold text-bangalore-primary text-2xl">
                 {branding?.restaurantName?.charAt(0) || 'B'}
               </span>
             </div>
          )}
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight">{branding?.restaurantName || 'The Bangalore Kitchen'}</h1>
            <p className="text-bangalore-accent opacity-90 tracking-widest text-sm uppercase">Queue Display</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
          <Clock size={24} className="text-bangalore-accent" />
          <span className="text-2xl font-bold font-mono tracking-wider">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row p-6 md:p-10 gap-8 h-full">
        {/* NOW SERVING SECTION (Left / Top) */}
        <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-bangalore-primary">
          <div className="bg-bangalore-primary py-6 text-center">
            <h2 className="text-4xl text-white font-bold tracking-widest uppercase">Now Serving</h2>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-bangalore-primary/5 relative">
            <AnimatePresence mode="popLayout">
              {currentlyServing.length > 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
                  {currentlyServing.map((t, idx) => (
                    <motion.div 
                      key={t.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="bg-white px-12 py-8 rounded-3xl shadow-2xl border-2 border-bangalore-primary text-center w-full max-w-lg relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-full h-2 bg-bangalore-primary"></div>
                      <h3 className="text-7xl md:text-9xl font-bold text-bangalore-primary mb-4 font-mono">{t.tokenNumber}</h3>
                      <p className="text-3xl text-gray-600 font-medium">Please proceed to counter</p>
                      {t.customerName && t.customerName !== 'Walk-in' && (
                        <p className="text-xl text-gray-500 mt-2">{t.customerName}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center text-gray-400"
                >
                  <Clock size={80} className="mb-6 opacity-20" />
                  <p className="text-2xl font-medium">Waiting for next customer...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* UP NEXT SECTION (Right / Bottom) */}
        <div className="w-full md:w-1/3 flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gray-100 py-6 text-center border-b border-gray-200">
            <h2 className="text-3xl text-gray-800 font-bold tracking-widest uppercase">Up Next</h2>
          </div>
          <div className="flex-1 p-6 flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {waitingList.length > 0 ? (
                waitingList.map((t, idx) => (
                  <motion.div 
                    key={t.id}
                    layout
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <span className="text-gray-500 text-sm font-bold uppercase tracking-wider block mb-1">Queue Pos #{idx + 1}</span>
                      <h3 className="text-4xl font-bold text-gray-900 font-mono tracking-tight">{t.tokenNumber}</h3>
                    </div>
                    {/* Optionally show Est wait time */}
                    <div className="text-right flex flex-col items-end">
                       <span className="text-xs text-gray-400 font-medium bg-white px-2 py-1 rounded-full border mb-2 shadow-sm">EST WAIT</span>
                       <span className="text-2xl font-bold text-bangalore-primary">{(idx + 1) * (settings?.avgServiceTime || 10)}m</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl m-2">
                   <p className="text-xl font-medium">No one is waiting</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      
      {/* Ticker at bottom could go here */}
    </div>
  );
}

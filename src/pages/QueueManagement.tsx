import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, setDoc, 
  serverTimestamp, getDoc, getDocs 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Users, Clock, Play, CheckCircle, SkipForward, XCircle, Settings, Monitor, Plus } from 'lucide-react';
import { QueueToken, QueueSettings } from '../types/queue';
import { cn } from '../lib/utils';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function QueueManagement() {
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [tokens, setTokens] = useState<QueueToken[]>([]);
  const [settings, setSettings] = useState<QueueSettings | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Settings Form
  const [avgWait, setAvgWait] = useState(10);
  const [isQueueActive, setIsQueueActive] = useState(true);
  
  // Add Walk-in Form
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', partySize: '2', request: '' });

  useEffect(() => {
    // Fetch branches
    const p = getDocs(query(collection(db, 'branches'), orderBy('name'))).then(snapshot => {
      const bList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBranches(bList);
      if (bList.length > 0 && !selectedBranchId) {
        setSelectedBranchId(bList[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedBranchId) return;
    
    setLoading(true);
    // Listen directly to queue settings
    const settingsRef = doc(db, 'queues', selectedBranchId, 'config', 'settings');
    const unsubSettings = onSnapshot(settingsRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as QueueSettings;
        setSettings(data);
        setAvgWait(data.avgServiceTime || 10);
        setIsQueueActive(data.isQueueActive ?? true);
      } else {
        // Initialize if not exists
        const initData: QueueSettings = {
          avgServiceTime: 10,
          isQueueActive: true,
          currentServing: null,
          dailyTokenCounter: 0,
          lastResetDate: new Date().toISOString().split('T')[0]
        };
        setDoc(settingsRef, initData);
      }
    });

    const tokensRef = collection(db, 'queues', selectedBranchId, 'tokens');
    const qTokens = query(tokensRef, orderBy('createdAt', 'asc'));
    const unsubTokens = onSnapshot(qTokens, (snapshot) => {
      const tList: QueueToken[] = [];
      snapshot.forEach(d => tList.push({ id: d.id, ...d.data() } as QueueToken));
      setTokens(tList);
      setLoading(false);
    });

    return () => {
      unsubSettings();
      unsubTokens();
    };
  }, [selectedBranchId]);

  const handleUpdateSettings = async () => {
    if (!selectedBranchId) return;
    const settingsRef = doc(db, 'queues', selectedBranchId, 'config', 'settings');
    await updateDoc(settingsRef, {
      avgServiceTime: avgWait,
      isQueueActive: isQueueActive
    });
    alert("Settings Updated!");
  };

  const handleAddToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBranchId || !settings) return;
    
    // Check if daily reset is needed
    const todayStr = new Date().toISOString().split('T')[0];
    let newCounter = settings.dailyTokenCounter + 1;
    let newResetDate = settings.lastResetDate;

    if (settings.lastResetDate !== todayStr) {
      newCounter = 1;
      newResetDate = todayStr;
    }

    const tokenNumber = `Q${String(newCounter).padStart(3, '0')}`;
    
    const settingsRef = doc(db, 'queues', selectedBranchId, 'config', 'settings');
    await updateDoc(settingsRef, {
      dailyTokenCounter: newCounter,
      lastResetDate: newResetDate
    });

    // Calculate wait time
    const waitingTokens = tokens.filter(t => t.status === 'waiting').length;
    const estWait = (waitingTokens + 1) * settings.avgServiceTime;

    const tokenData: QueueToken = {
      tokenNumber,
      customerName: formData.name || 'Walk-in',
      phone: formData.phone,
      partySize: parseInt(formData.partySize) || 2,
      status: 'waiting',
      createdAt: serverTimestamp(),
      estimatedWait: estWait,
      specialRequest: formData.request,
      branchId: selectedBranchId
    };

    await addDoc(collection(db, 'queues', selectedBranchId, 'tokens'), tokenData);
    setFormData({ name: '', phone: '', partySize: '2', request: '' });
    setShowAddModal(false);
  };

  const handleStatusChange = async (tokenId: string, newStatus: QueueToken['status']) => {
    if (!selectedBranchId) return;
    const tokenRef = doc(db, 'queues', selectedBranchId, 'tokens', tokenId);
    const updates: any = { status: newStatus };
    if (newStatus === 'serving') {
      updates.calledAt = serverTimestamp();
      const settingsRef = doc(db, 'queues', selectedBranchId, 'config', 'settings');
      await updateDoc(settingsRef, { currentServing: tokenId });
      
      // Notification Logic: Check the upcoming tokens and notify the 2nd next
      const sortedWaiting = tokens.filter(t => t.status === 'waiting').sort((a,b) => {
        const aT = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
        const bT = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
        return aT - bT;
      });
      // The 2nd in waiting will now become 1st. Wait, if we advance `serving`, the next is sortedWaiting[0].
      // The one approaching is sortedWaiting[1].
      if (sortedWaiting.length > 1) {
         const approachingToken = sortedWaiting[1];
         // Write a notification for them
         await addDoc(collection(db, 'notifications'), {
           title: 'Your Table is Almost Ready!',
           message: `Token ${approachingToken.tokenNumber} is approaching. There is only 1 person ahead of you.`,
           createdAt: serverTimestamp(),
           status: 'sent',
           targetPhone: approachingToken.phone // for external routing if needed
         });
      }
    }
    if (newStatus === 'completed' || newStatus === 'cancelled') {
      updates.completedAt = serverTimestamp();
      const settingsRef = doc(db, 'queues', selectedBranchId, 'config', 'settings');
      if (settings?.currentServing === tokenId) {
        await updateDoc(settingsRef, { currentServing: null });
      }
    }
    await updateDoc(tokenRef, updates);
  };

  const handleSkip = async (tokenId: string) => {
    if (!selectedBranchId) return;
    const tokenRef = doc(db, 'queues', selectedBranchId, 'tokens', tokenId);
    
    // Check if it was serving, change to waiting and move back
    const token = tokens.find(t => t.id === tokenId);
    const updates: any = { status: 'waiting', createdAt: serverTimestamp() };
    
    if (token?.status === 'serving') {
       const settingsRef = doc(db, 'queues', selectedBranchId, 'config', 'settings');
       await updateDoc(settingsRef, { currentServing: null });
    }
    
    await updateDoc(tokenRef, updates);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'serving': return 'bg-blue-100 text-blue-800 border-blue-200 animate-pulse';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Analytics
  const activeTokens = tokens.filter(t => t.status === 'waiting' || t.status === 'serving');
  const waitingTokens = tokens.filter(t => t.status === 'waiting');
  
  // Calculate average wait time logic:
  // Usually this is based on completed tokens, but let's just show an estimated total wait based on current queue
  const currentTotalWait = waitingTokens.length * (settings?.avgServiceTime || 10);
  
  const todayTokens = tokens.filter(t => {
      if(!t.createdAt) return false;
      const tD = t.createdAt.toDate ? t.createdAt.toDate() : new Date(t.createdAt);
      const today = new Date();
      return tD.getDate() === today.getDate() && tD.getMonth() === today.getMonth();
  });
  const todayServed = todayTokens.filter(t => t.status === 'completed').length;

  const peakHoursData = Array.from({length: 12}).map((_, i) => {
    const hour = i + 10; // e.g. 10 AM to 9 PM
    const count = todayTokens.filter(t => {
       const tD = t.createdAt?.toDate ? t.createdAt.toDate() : new Date(t.createdAt);
       return tD.getHours() === hour;
    }).length;
    return { name: `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? 'p' : 'a'}`, count };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Queue Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage walk-ins and table waiting lines.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedBranchId} 
            onChange={(e) => setSelectedBranchId(e.target.value)}
            className="p-2 border rounded-xl outline-none focus:ring-2 focus:ring-bangalore-primary"
          >
            {branches.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
          <a
            href={`/queue-display/${selectedBranchId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200 font-medium transition-colors"
          >
            <Monitor size={18} /> Display Screen
          </a>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-bangalore-primary text-white px-4 py-2 rounded-xl font-medium hover:bg-bangalore-primary/90 transition-colors"
          >
            <Plus size={18} /> Walk-in
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
             <Users size={24} />
           </div>
           <div>
             <p className="text-sm text-gray-500 font-medium">Currently Waiting</p>
             <h3 className="text-2xl font-bold text-gray-900">{waitingTokens.length}</h3>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
             <Clock size={24} />
           </div>
           <div>
             <p className="text-sm text-gray-500 font-medium">Est Wait Time</p>
             <h3 className="text-2xl font-bold text-gray-900">{currentTotalWait}m</h3>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
             <CheckCircle size={24} />
           </div>
           <div>
             <p className="text-sm text-gray-500 font-medium">Total Served Today</p>
             <h3 className="text-2xl font-bold text-gray-900">{todayServed}</h3>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
             <Settings size={24} />
           </div>
           <div>
             <p className="text-sm text-gray-500 font-medium">Avg Serv Time</p>
             <h3 className="text-2xl font-bold text-gray-900">{settings?.avgServiceTime || 0}m</h3>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-lg text-gray-900">Active Queue</h2>
             </div>
             
             {loading ? <p className="p-8 text-center text-gray-500">Loading queue...</p> : 
             activeTokens.length === 0 ? (
               <div className="p-12 text-center flex flex-col items-center">
                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <Users size={32} />
                 </div>
                 <p className="text-gray-500">Queue is currently empty.</p>
               </div>
             ) : (
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-gray-50 border-b border-gray-100 text-sm">
                       <th className="p-4 font-semibold text-gray-600">Token</th>
                       <th className="p-4 font-semibold text-gray-600">Customer</th>
                       <th className="p-4 font-semibold text-gray-600">Arrived</th>
                       <th className="p-4 font-semibold text-gray-600 text-center">Status</th>
                       <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {activeTokens.map((token, i) => (
                       <tr key={token.id} className="hover:bg-gray-50 transition-colors">
                         <td className="p-4 font-bold text-bangalore-primary">{token.tokenNumber}</td>
                         <td className="p-4">
                           <div className="font-medium text-gray-900">{token.customerName}</div>
                           <div className="text-xs text-gray-400">{token.phone} • Party of {token.partySize}</div>
                         </td>
                         <td className="p-4 text-sm text-gray-500">
                           {token.createdAt?.toDate ? token.createdAt.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
                         </td>
                         <td className="p-4 text-center">
                           <span className={cn("px-3 py-1 rounded-full text-xs font-bold border", getStatusColor(token.status))}>
                             {token.status.toUpperCase()}
                           </span>
                         </td>
                         <td className="p-4">
                           <div className="flex items-center justify-end gap-2">
                             {token.status === 'waiting' && (
                               <button 
                                 onClick={() => handleStatusChange(token.id!, 'serving')}
                                 className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 tooltip-trigger"
                                 title="Call Next"
                               >
                                 <Play size={18} />
                               </button>
                             )}
                             {token.status === 'serving' && (
                               <button 
                                 onClick={() => handleStatusChange(token.id!, 'completed')}
                                 className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 tooltip-trigger"
                                 title="Mark Completed"
                               >
                                 <CheckCircle size={18} />
                               </button>
                             )}
                             <button
                               onClick={() => handleSkip(token.id!)}
                               className="p-1.5 bg-orange-50 text-orange-600 rounded hover:bg-orange-100 tooltip-trigger"
                               title="Skip (Move to end of queue)"
                             >
                               <SkipForward size={18} />
                             </button>
                             <button 
                               onClick={() => handleStatusChange(token.id!, 'cancelled')}
                               className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 tooltip-trigger"
                               title="Cancel"
                             >
                               <XCircle size={18} />
                             </button>
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             )}
           </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h2 className="font-bold text-lg mb-4">Queue Settings</h2>
             <div className="space-y-4">
               <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Queue Status</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={isQueueActive} onChange={e => setIsQueueActive(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bangalore-primary"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">{isQueueActive ? 'Accepting Customers' : 'Queue Paused'}</span>
                  </label>
               </div>
               <div>
                 <label className="text-sm font-medium text-gray-700 block mb-1">Avg Service Time (mins)</label>
                 <input 
                   type="number" 
                   value={avgWait} 
                   onChange={(e) => setAvgWait(parseInt(e.target.value) || 1)}
                   className="w-full p-2 border rounded-xl outline-none"
                 />
               </div>
               <button 
                 onClick={handleUpdateSettings}
                 className="w-full bg-gray-100 text-gray-800 font-medium py-2 rounded-xl hover:bg-gray-200"
               >
                 Save Settings
               </button>
             </div>
           </div>

           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
             <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                 <h2 className="font-bold text-gray-900 text-sm">Peak Hours Today</h2>
             </div>
             <div className="p-4 h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={peakHoursData}>
                     <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                     <YAxis hide />
                     <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                     <Bar dataKey="count" fill="#800000" radius={[4, 4, 0, 0]} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
           </div>

           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
             <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                 <h2 className="font-bold text-gray-900 text-sm">Recent History</h2>
             </div>
             <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                {tokens.filter(t => t.status === 'completed' || t.status === 'cancelled').slice(-10).reverse().map(token => (
                  <div key={token.id} className="p-3 text-sm flex justify-between items-center">
                    <div>
                      <span className="font-bold text-gray-900">{token.tokenNumber}</span>
                      <span className="text-gray-500 ml-2">{token.customerName}</span>
                    </div>
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded", token.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                      {token.status}
                    </span>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
             <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
               <h3 className="font-bold text-lg">Add to Queue</h3>
               <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-800"><XCircle size={20}/></button>
             </div>
             <form onSubmit={handleAddToken} className="p-6 space-y-4">
               <div>
                 <label className="text-sm font-medium text-gray-700">Customer Name</label>
                 <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded-xl mt-1" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-sm font-medium text-gray-700">Phone</label>
                   <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border rounded-xl mt-1" />
                 </div>
                 <div>
                   <label className="text-sm font-medium text-gray-700">Party Size</label>
                   <input type="number" min="1" required value={formData.partySize} onChange={e => setFormData({...formData, partySize: e.target.value})} className="w-full p-2 border rounded-xl mt-1" />
                 </div>
               </div>
               <div>
                 <label className="text-sm font-medium text-gray-700">Special Request (Optional)</label>
                 <textarea value={formData.request} onChange={e => setFormData({...formData, request: e.target.value})} className="w-full p-2 border rounded-xl mt-1" rows={2} />
               </div>
               <button type="submit" className="w-full py-3 bg-bangalore-primary text-white rounded-xl font-bold custom-shadow mt-4 hover:bg-bangalore-primary/90">
                 Generate Token
               </button>
             </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

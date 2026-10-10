import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ChefHat, CheckCircle2, User, AlertCircle } from 'lucide-react';
import { autoAssignRider, updateOrderStatus } from '../lib/orderAssignment';

export function KitchenDisplay() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  // Update clock every minute for elapsed time calculation
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, 'orders'), 
      where('status', 'in', ['pending', 'accepted', 'preparing', 'ready', 'assigned']),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const calculateElapsed = (createdAt: string) => {
    const start = new Date(createdAt);
    const diff = Math.floor((new Date().getTime() - start.getTime()) / 60000); // minutes
    return diff;
  };

  const handleStartPreparing = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, 'preparing');
    } catch (error) {
      console.error("Error starting preparation:", error);
    }
  };

  const handleMarkReady = async (orderId: string) => {
    try {
      // Prompt says: Query riders, auto-assign, update status to 'assigned'
      await autoAssignRider(orderId);
    } catch (error: any) {
      alert(error.message || "Failed to assign rider");
      // Fallback: manually mark as ready if assignment fails? 
      // User said "When Mark Ready clicked: Auto-assign... Update order status: assigned"
      // So we must assign.
    }
  };

  const newOrders = orders.filter(o => o.status === 'pending' || o.status === 'accepted');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready' || o.status === 'assigned');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bangalore-accent"></div>
          <p className="text-xl tracking-widest font-bold">LOADING KITCHEN...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans p-6 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6 shrink-0">
        <div>
          <h1 className="text-4xl font-serif font-black text-bangalore-accent tracking-tight">KITCHEN DISPLAY SYSTEM</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">The Bangalore Kitchen • Live Kitchen Feed</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-mono font-black">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-tighter">Current Time</p>
        </div>
      </div>

      {/* Grid Columns */}
      <div className="flex-1 grid grid-cols-3 gap-8 overflow-hidden">
        
        {/* NEW ORDERS */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 bg-blue-900/30 border border-blue-900 rounded-xl">
            <h2 className="text-2xl font-black uppercase text-blue-400 flex items-center gap-2">
              <Clock size={28} /> New Orders
            </h2>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-black">{newOrders.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {newOrders.map(order => (
                <OrderCard key={order.id} order={order} type="new" onAction={() => handleStartPreparing(order.id)} calculateElapsed={calculateElapsed} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* PREPARING */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 bg-yellow-900/30 border border-yellow-900 rounded-xl">
            <h2 className="text-2xl font-black uppercase text-yellow-500 flex items-center gap-2">
              <ChefHat size={28} /> Preparing
            </h2>
            <span className="bg-yellow-600 text-white px-3 py-1 rounded-full font-black">{preparingOrders.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar text-white">
            <AnimatePresence mode="popLayout">
              {preparingOrders.map(order => (
                <OrderCard key={order.id} order={order} type="preparing" onAction={() => handleMarkReady(order.id)} calculateElapsed={calculateElapsed} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* READY / ASSIGNED */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 bg-green-900/30 border border-green-900 rounded-xl">
            <h2 className="text-2xl font-black uppercase text-green-500 flex items-center gap-2">
              <CheckCircle2 size={28} /> Ready
            </h2>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full font-black">{readyOrders.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {readyOrders.map(order => (
                <OrderCard key={order.id} order={order} type="ready" calculateElapsed={calculateElapsed} />
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

function OrderCard({ order, type, onAction, calculateElapsed }: any) {
  const elapsed = calculateElapsed(order.createdAt);
  const isDelayed = elapsed > 15;

  const getStyle = () => {
    switch (type) {
      case 'new': return 'border-blue-900 bg-gray-900 hover:border-blue-500';
      case 'preparing': return 'border-yellow-900 bg-gray-900 hover:border-yellow-500';
      case 'ready': return 'border-green-900 bg-gray-900 opacity-90';
      default: return 'border-gray-800 bg-gray-900';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, x: 50 }}
      className={`border-2 rounded-2xl p-5 shadow-2xl transition-all ${getStyle()}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Order ID</p>
          <h3 className="text-2xl font-black text-white">#{order.id.slice(-6).toUpperCase()}</h3>
        </div>
        <div className={`px-3 py-1 rounded-lg flex items-center gap-1 ${isDelayed ? 'bg-red-900/50 text-red-400' : 'bg-gray-800 text-gray-400'}`}>
          <Clock size={16} />
          <span className="font-mono font-bold text-xl">{elapsed}m</span>
        </div>
      </div>

      <div className="mb-6 space-y-2 border-l-4 border-bangalore-accent pl-4 py-1">
        <p className="text-sm font-bold text-gray-500 uppercase">Customer</p>
        <p className="text-2xl font-black text-white leading-tight">{order.customerName}</p>
      </div>

      <div className="space-y-3 mb-6 bg-black/40 rounded-xl p-4">
        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Items</p>
        {order.items?.map((item: any, i: number) => (
          <div key={i} className="flex justify-between items-center text-xl">
            <span className="font-bold text-gray-200">
              <span className="text-bangalore-accent font-black mr-2">{item.quantity}x</span>
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {type !== 'ready' ? (
        <button
          onClick={onAction}
          className={`w-full py-4 rounded-xl font-black text-2xl uppercase tracking-tighter transition-all active:scale-95 shadow-lg ${
            type === 'new' 
              ? 'bg-blue-600 hover:bg-blue-500 text-white' 
              : 'bg-yellow-600 hover:bg-yellow-500 text-white'
          }`}
        >
          {type === 'new' ? 'Start Preparing' : 'Mark Ready'}
        </button>
      ) : (
        <div className="flex flex-col gap-2 p-4 bg-green-900/20 border border-green-900/50 rounded-xl">
          <div className="flex items-center gap-2 text-green-400 font-black uppercase text-sm">
            {order.status === 'assigned' ? (
              <>
                <User size={18} />
                Rider Assigned
              </>
            ) : (
              <>
                <AlertCircle size={18} />
                Waiting for Rider
              </>
            )}
          </div>
          {order.riderName && (
            <p className="text-2xl font-black text-white">{order.riderName}</p>
          )}
        </div>
      )}
    </motion.div>
  );
}

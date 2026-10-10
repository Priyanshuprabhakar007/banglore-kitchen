import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Bell, Trash2, Send } from 'lucide-react';
import { cn } from '../lib/utils';

export function NotificationsManagement() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'notifications'), orderBy('createdAt', 'desc')), (snapshot) => {
      setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;
    try {
      setSending(true);
      await addDoc(collection(db, 'notifications'), {
        title,
        message,
        createdAt: serverTimestamp(),
        status: 'sent'
      });
      setTitle('');
      setMessage('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error sending notification:", error);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async () => {
    if (confirmDeleteId) {
      try {
        await deleteDoc(doc(db, 'notifications', confirmDeleteId));
        setConfirmDeleteId(null);
      } catch (error) {
        console.error("Error deleting notification:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Push Notifications</h1>
        <p className="text-gray-500 text-sm mt-1">Send alerts and updates to all app users.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Send size={18}/> Send New Broadcast</h2>
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Notification Title *</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded-lg mt-1" placeholder="e.g. Weekend Special Offer!" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Message *</label>
                <textarea required rows={4} value={message} onChange={e => setMessage(e.target.value)} className="w-full p-2 border rounded-lg mt-1" placeholder="Type your message here..." />
              </div>
              <button 
                type="submit" 
                disabled={sending}
                className={cn(
                  "w-full py-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2",
                  success ? "bg-green-500 text-white" : "bg-bangalore-primary text-white hover:bg-bangalore-primary"
                )}
              >
                {sending ? "Sending..." : success ? "Notification Sent!" : "Send to All Users"}
                {!sending && !success && <Send size={18} />}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-bold text-gray-900">Broadcast History</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {loading ? <p className="p-8 text-center text-gray-500">Loading...</p> : 
               notifications.length === 0 ? <p className="p-8 text-center text-gray-500">No notifications sent yet.</p> :
               notifications.map(notif => (
                <div key={notif.id} className="p-4 flex gap-4 hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Bell size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900">{notif.title}</h3>
                      <button onClick={() => setConfirmDeleteId(notif.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={16}/></button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{new Date(notif.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete this notification record? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDeleteId(null)} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

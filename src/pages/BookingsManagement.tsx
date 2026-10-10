import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Calendar, Clock, Users, MapPin, Check, X } from 'lucide-react';

export function BookingsManagement() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('bookingDate', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const now = new Date();
  const filteredBookings = bookings.filter(b => {
    const bookingDate = new Date(b.bookingDate);
    if (filter === 'upcoming') return bookingDate >= now && b.status !== 'cancelled';
    if (filter === 'past') return bookingDate < now && b.status !== 'cancelled';
    if (filter === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Table Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage restaurant reservations.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-2">
          {['upcoming', 'past', 'cancelled', 'all'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${filter === f ? 'bg-bangalore-primary text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="p-4">
          {loading ? <p className="text-center py-8 text-gray-500">Loading bookings...</p> : filteredBookings.length === 0 ? <p className="text-center py-8 text-gray-500">No bookings found.</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBookings.map(booking => (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={booking.id} className="border rounded-xl p-5 shadow-sm relative">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{booking.customerName}</h3>
                      <p className="text-sm text-gray-500">{booking.customerPhone}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : booking.status === 'completed' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar size={16} className="text-bangalore-primary" /> {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock size={16} className="text-bangalore-primary" /> {new Date(booking.bookingDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Users size={16} className="text-bangalore-primary" /> {booking.guestCount} Guests
                    </div>
                    {booking.occasion && (
                      <div className="text-sm text-gray-500 italic mt-2 bg-gray-50 p-2 rounded">
                        Occasion: {booking.occasion}
                      </div>
                    )}
                  </div>

                  {booking.status === 'pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(booking.id, 'confirmed')} className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><Check size={16}/> Confirm</button>
                      <button onClick={() => updateStatus(booking.id, 'cancelled')} className="flex-1 bg-red-50 text-red-600 border border-red-200 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><X size={16}/> Cancel</button>
                    </div>
                  )}
                  {booking.status === 'confirmed' && filter === 'upcoming' && (
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(booking.id, 'completed')} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium">Mark Completed</button>
                      <button onClick={() => updateStatus(booking.id, 'cancelled')} className="flex-1 bg-red-50 text-red-600 border border-red-200 py-2 rounded-lg text-sm font-medium">Cancel</button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

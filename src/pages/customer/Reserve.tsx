import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react';

export function Reserve() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Combine date and time
      const bookingDateTime = new Date(`${formData.date}T${formData.time}`).toISOString();
      
      await addDoc(collection(db, 'bookings'), {
        customerName: formData.name,
        customerPhone: formData.phone,
        bookingDate: bookingDateTime,
        guestCount: Number(formData.guests),
        occasion: formData.occasion,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error booking table:", error);
      alert("Failed to submit booking request.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-bangalore-ivory p-4 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Request Received!</h1>
        <p className="text-gray-600 max-w-md mb-8">Thank you for choosing The Bangalore Kitchen. Our team will contact you shortly on {formData.phone} to confirm your reservation.</p>
        <button onClick={() => window.location.reload()} className="text-bangalore-primary font-bold hover:underline">Make another booking</button>
      </div>
    );
  }

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-bangalore-ivory py-12">
      <Helmet>
        <title>Reserve a Table | The Bangalore Kitchen</title>
        <meta name="description" content="Book your table at The Bangalore Kitchen for an authentic dining experience." />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Reserve a Table</h1>
          <p className="text-gray-600">Join us for an authentic Indian dining experience in Jersey City.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-bangalore-card-alt border border-bangalore-border rounded-3xl shadow-xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-bangalore-primary focus:ring-1 focus:ring-bangalore-primary" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number *</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-bangalore-primary focus:ring-1 focus:ring-bangalore-primary" placeholder="(201) 300-4080" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Calendar size={16}/> Date *</label>
                <input required type="date" min={minDate} value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-bangalore-primary focus:ring-1 focus:ring-bangalore-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Clock size={16}/> Time *</label>
                <input required type="time" min="11:00" max="22:30" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-bangalore-primary focus:ring-1 focus:ring-bangalore-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Users size={16}/> Guests *</label>
                <select required value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-bangalore-primary focus:ring-1 focus:ring-bangalore-primary bg-white">
                  {[1,2,3,4,5,6,7,8,9,10, '10+'].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Special Occasion (Optional)</label>
              <select value={formData.occasion} onChange={e => setFormData({...formData, occasion: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-bangalore-primary focus:ring-1 focus:ring-bangalore-primary bg-white">
                <option value="">None</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Business Meeting">Business Meeting</option>
                <option value="Family Gathering">Family Gathering</option>
              </select>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-bangalore-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-bangalore-accent transition-colors disabled:opacity-70 flex justify-center items-center">
              {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Request Reservation'}
            </button>
            <p className="text-xs text-center text-gray-500 mt-4">By submitting this form, you agree to our reservation policy. Tables are held for 15 minutes past the reservation time.</p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

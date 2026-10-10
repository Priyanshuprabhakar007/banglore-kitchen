import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../lib/CartContext';
import { useAuth } from '../../lib/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { CheckCircle, MapPin, CreditCard } from 'lucide-react';

export function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    phone: '',
    address: '',
    paymentMethod: 'cod'
  });

  const tax = Math.round(totalPrice * 0.05);
  const delivery = 40;
  const finalTotal = totalPrice + tax + delivery;

  if (items.length === 0 && !success) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const orderData = {
        customerName: formData.name,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        userId: user?.uid || 'guest',
        items: items,
        subtotal: totalPrice,
        tax: tax,
        deliveryFee: delivery,
        totalAmount: finalTotal,
        paymentMethod: formData.paymentMethod,
        status: 'pending',
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      setOrderId(docRef.id);
      setSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-bangalore-ivory p-4">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-2">Thank you for your order. Your food is being prepared.</p>
        <p className="font-mono bg-white px-4 py-2 rounded-lg border mb-8">Order ID: {orderId}</p>
        <button onClick={() => navigate('/')} className="bg-bangalore-primary text-white px-8 py-3 rounded-full font-bold hover:bg-bangalore-primary transition-colors">
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bangalore-ivory py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Delivery Details */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="text-bangalore-primary" /> Delivery Details
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Full Name *</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border rounded-xl mt-1 outline-none focus:border-bangalore-primary focus:ring-1 focus:ring-bangalore-primary" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                      <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border rounded-xl mt-1 outline-none focus:border-bangalore-primary focus:ring-1 focus:ring-bangalore-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Complete Delivery Address *</label>
                    <textarea required rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-3 border rounded-xl mt-1 outline-none focus:border-bangalore-primary focus:ring-1 focus:ring-bangalore-primary" placeholder="House/Flat No., Building Name, Street, Area" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="text-bangalore-primary" /> Payment Method
                </h2>
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-bangalore-primary bg-bangalore-primary/5' : 'hover:bg-gray-50'}`}>
                    <input type="radio" name="payment" value="cod" checked={formData.paymentMethod === 'cod'} onChange={e => setFormData({...formData, paymentMethod: e.target.value})} className="w-5 h-5 text-bangalore-primary focus:ring-bangalore-primary" />
                    <span className="ml-3 font-medium text-gray-900">Cash on Delivery (COD)</span>
                  </label>
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'upi' ? 'border-bangalore-primary bg-bangalore-primary/5' : 'hover:bg-gray-50'}`}>
                    <input type="radio" name="payment" value="upi" checked={formData.paymentMethod === 'upi'} onChange={e => setFormData({...formData, paymentMethod: e.target.value})} className="w-5 h-5 text-bangalore-primary focus:ring-bangalore-primary" />
                    <span className="ml-3 font-medium text-gray-900">UPI / Online Payment</span>
                  </label>
                </div>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.quantity}x {item.name}</span>
                    <span className="font-medium">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes (5%)</span>
                  <span>${tax}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>${delivery}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-xl text-gray-900">
                  <span>Total to Pay</span>
                  <span className="text-bangalore-primary">${finalTotal}</span>
                </div>
              </div>

              <button 
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full bg-bangalore-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-bangalore-primary transition-colors disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

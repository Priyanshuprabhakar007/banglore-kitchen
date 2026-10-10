import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../lib/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { ProductImage } from '../../components/ProductImage';

export function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-bangalore-ivory p-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-gray-300">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">Looks like you haven't added any delicious items to your cart yet.</p>
        <Link to="/menu" className="bg-bangalore-primary text-white px-8 py-3 rounded-full font-bold hover:bg-bangalore-primary transition-colors">
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bangalore-ivory py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Your Cart ({totalItems} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={item.id} 
                className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm items-center"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  <ProductImage src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                  <p className="text-bangalore-primary font-bold mt-1">${item.price}</p>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-600 p-1">
                    <Trash2 size={18} />
                  </button>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded bg-white shadow-sm text-gray-600 hover:text-bangalore-primary">
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded bg-white shadow-sm text-gray-600 hover:text-bangalore-primary">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes (5%)</span>
                  <span>${Math.round(totalPrice * 0.05)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>$40</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span className="text-bangalore-primary">${totalPrice + Math.round(totalPrice * 0.05) + 40}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-bangalore-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-bangalore-primary transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>
              
              <Link to="/menu" className="block text-center mt-4 text-bangalore-primary font-medium hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

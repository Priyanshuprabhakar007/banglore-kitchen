import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Ticket, Copy, CheckCircle } from 'lucide-react';

export function Offers() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState('');

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const q = query(collection(db, 'offers'), where('isActive', '==', true));
        const snapshot = await getDocs(q);
        setOffers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="min-h-screen bg-bangalore-ivory py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Special Offers</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover exclusive deals on your favorite Indian dishes at The Bangalore Kitchen.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bangalore-primary"></div></div>
        ) : offers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <Ticket size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No active offers right now</h2>
            <p className="text-gray-500">Check back later for exciting new deals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={offer.id} 
                className="bg-bangalore-card-alt rounded-3xl p-6 shadow-md border border-bangalore-border relative overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-bangalore-primary/5 rounded-full"></div>
                <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-bangalore-accent/20 rounded-full"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-bangalore-primary text-bangalore-accent rounded-xl flex items-center justify-center shadow-md">
                      <Ticket size={24} />
                    </div>
                    <div>
                      <span className="block text-2xl font-bold text-bangalore-primary">
                        {offer.discountType === 'percentage' ? `${offer.discountValue}% OFF` : `$${offer.discountValue} OFF`}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 font-medium mb-4 min-h-[48px]">{offer.description}</p>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4 flex justify-between items-center">
                    <span className="font-mono font-bold text-lg text-gray-900 tracking-wider">{offer.code}</span>
                    <button 
                      onClick={() => copyToClipboard(offer.code)}
                      className="text-bangalore-primary hover:text-bangalore-primary transition-colors flex items-center gap-1 text-sm font-bold"
                    >
                      {copiedCode === offer.code ? <><CheckCircle size={16}/> Copied</> : <><Copy size={16}/> Copy</>}
                    </button>
                  </div>
                  
                  <div className="text-xs text-gray-500 flex justify-between items-center">
                    <span>Min. Order: ${offer.minOrderValue || 0}</span>
                    {offer.validUntil && <span>Valid till: {new Date(offer.validUntil).toLocaleDateString()}</span>}
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

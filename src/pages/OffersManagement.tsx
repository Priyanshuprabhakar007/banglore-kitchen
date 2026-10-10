import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Plus, Search, Edit2, Trash2, Ticket } from 'lucide-react';

export function OffersManagement() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderValue: '',
    isActive: true,
    validUntil: ''
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'offers')), (snapshot) => {
      setOffers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ 
        code: item.code, description: item.description || '', 
        discountType: item.discountType, discountValue: item.discountValue.toString(),
        minOrderValue: item.minOrderValue?.toString() || '0',
        isActive: item.isActive ?? true, validUntil: item.validUntil || ''
      });
    } else {
      setEditingItem(null);
      setFormData({ code: '', description: '', discountType: 'percentage', discountValue: '', minOrderValue: '0', isActive: true, validUntil: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { 
        ...formData, 
        code: formData.code.toUpperCase(),
        discountValue: Number(formData.discountValue),
        minOrderValue: Number(formData.minOrderValue)
      };
      if (editingItem) {
        await updateDoc(doc(db, 'offers', editingItem.id), data);
      } else {
        await addDoc(collection(db, 'offers'), data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving offer:", error);
    }
  };

  const handleDelete = async () => {
    if (confirmDeleteId) {
      try {
        await deleteDoc(doc(db, 'offers', confirmDeleteId));
        setConfirmDeleteId(null);
      } catch (error) {
        console.error("Error deleting offer:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Offers & Coupons</h1>
          <p className="text-gray-500 text-sm mt-1">Manage discount codes and promotions.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-bangalore-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-bangalore-primary flex items-center gap-2">
          <Plus size={18} /> Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? <p>Loading...</p> : offers.map(offer => (
          <div key={offer.id} className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rounded-full ${offer.isActive ? 'bg-green-100' : 'bg-gray-100'}`}></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <Ticket className="text-bangalore-primary" size={20} />
                <span className="font-bold text-lg tracking-wider text-gray-900">{offer.code}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleOpenModal(offer)} className="text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                <button onClick={() => setConfirmDeleteId(offer.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold text-bangalore-primary">
                {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `$${offer.discountValue}`}
              </span>
              <span className="text-gray-500 ml-2">OFF</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
            <div className="text-xs text-gray-500 flex justify-between border-t pt-3 mt-3">
              <span>Min Order: ${offer.minOrderValue}</span>
              <span>Valid till: {offer.validUntil ? new Date(offer.validUntil).toLocaleDateString() : 'Forever'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete this offer? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDeleteId(null)} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </motion.div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Coupon' : 'Create Coupon'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Coupon Code *</label>
                <input required type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full p-2 border rounded-lg mt-1 uppercase" placeholder="e.g. FESTIVAL20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Discount Type</label>
                  <select value={formData.discountType} onChange={e => setFormData({...formData, discountType: e.target.value})} className="w-full p-2 border rounded-lg mt-1">
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount ($)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Value *</label>
                  <input required type="number" value={formData.discountValue} onChange={e => setFormData({...formData, discountValue: e.target.value})} className="w-full p-2 border rounded-lg mt-1" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <input type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded-lg mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Min Order Value ($)</label>
                  <input type="number" value={formData.minOrderValue} onChange={e => setFormData({...formData, minOrderValue: e.target.value})} className="w-full p-2 border rounded-lg mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Valid Until</label>
                  <input type="date" value={formData.validUntil} onChange={e => setFormData({...formData, validUntil: e.target.value})} className="w-full p-2 border rounded-lg mt-1" />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="rounded text-bangalore-primary" />
                <span className="text-sm font-medium text-gray-700">Coupon is Active</span>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg text-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-bangalore-primary text-white rounded-lg">Save Coupon</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

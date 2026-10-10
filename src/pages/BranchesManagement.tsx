import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Plus, Edit2, Trash2, MapPin, Clock } from 'lucide-react';

export function BranchesManagement() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    timings: '',
    isActive: true
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'branches')), (snapshot) => {
      setBranches(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ name: item.name, address: item.address, phone: item.phone || '', timings: item.timings || '', isActive: item.isActive ?? true });
    } else {
      setEditingItem(null);
      setFormData({ name: '', address: '', phone: '', timings: '', isActive: true });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDoc(doc(db, 'branches', editingItem.id), formData);
      } else {
        await addDoc(collection(db, 'branches'), formData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving branch:", error);
    }
  };

  const handleDelete = async () => {
    if (confirmDeleteId) {
      try {
        await deleteDoc(doc(db, 'branches', confirmDeleteId));
        setConfirmDeleteId(null);
      } catch (error) {
        console.error("Error deleting branch:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Branches</h1>
          <p className="text-gray-500 text-sm mt-1">Manage restaurant locations.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-bangalore-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-bangalore-primary flex items-center gap-2">
          <Plus size={18} /> Add Branch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? <p>Loading...</p> : branches.map(branch => (
          <div key={branch.id} className="bg-white border rounded-2xl p-6 shadow-sm relative">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-serif font-bold text-xl text-gray-900">{branch.name}</h3>
              <div className="flex gap-2">
                <button onClick={() => handleOpenModal(branch)} className="text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                <button onClick={() => setConfirmDeleteId(branch.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              <p className="text-sm text-gray-600 flex items-start gap-2">
                <MapPin size={16} className="text-bangalore-primary shrink-0 mt-0.5" /> {branch.address}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Clock size={16} className="text-bangalore-primary shrink-0" /> {branch.timings || '10:00 AM - 11:00 PM'}
              </p>
            </div>
            <div className="pt-4 border-t flex justify-between items-center">
              <span className={`px-2 py-1 rounded text-xs font-bold ${branch.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {branch.isActive ? 'OPERATIONAL' : 'CLOSED'}
              </span>
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
            <p className="text-gray-500 mb-6">Are you sure you want to delete this branch? This action cannot be undone.</p>
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
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Branch' : 'Add Branch'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Branch Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded-lg mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Address *</label>
                <textarea required rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-2 border rounded-lg mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border rounded-lg mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Timings</label>
                  <input type="text" value={formData.timings} onChange={e => setFormData({...formData, timings: e.target.value})} placeholder="10 AM - 11 PM" className="w-full p-2 border rounded-lg mt-1" />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="rounded text-bangalore-primary" />
                <span className="text-sm font-medium text-gray-700">Branch is Operational</span>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg text-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-bangalore-primary text-white rounded-lg">Save Branch</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

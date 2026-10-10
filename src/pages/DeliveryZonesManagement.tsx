import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Plus, Edit2, Trash2, Search, MapPin } from 'lucide-react';

export function DeliveryZonesManagement() {
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    pincode: '',
    city: '',
    deliveryCharge: '',
    minRadius: '',
    maxRadius: '',
    isActive: true
  });

  useEffect(() => {
    const q = query(collection(db, 'deliveryZones'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setZones(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || '',
        pincode: item.pincode || '',
        city: item.city || '',
        deliveryCharge: item.deliveryCharge?.toString() || '',
        minRadius: item.minRadius?.toString() || '',
        maxRadius: item.maxRadius?.toString() || '',
        isActive: item.isActive ?? true
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        pincode: '',
        city: '',
        deliveryCharge: '',
        minRadius: '',
        maxRadius: '',
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { 
        ...formData, 
        deliveryCharge: Number(formData.deliveryCharge),
        minRadius: Number(formData.minRadius),
        maxRadius: Number(formData.maxRadius),
        updatedAt: serverTimestamp()
      };
      
      if (editingItem) {
        await updateDoc(doc(db, 'deliveryZones', editingItem.id), data);
      } else {
        await addDoc(collection(db, 'deliveryZones'), {
          ...data,
          createdAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving zone:", error);
    }
  };

  const handleDelete = async () => {
    if (confirmDeleteId) {
      try {
        await deleteDoc(doc(db, 'deliveryZones', confirmDeleteId));
        setConfirmDeleteId(null);
      } catch (error) {
        console.error("Error deleting zone:", error);
      }
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'deliveryZones', id), { isActive: !currentStatus });
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const filtered = zones.filter(z => 
    z.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    z.pincode.includes(searchTerm) ||
    z.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Delivery Zones</h1>
          <p className="text-gray-500 text-sm mt-1">Manage delivery areas, pincodes, and charges.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-bangalore-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-bangalore-primary flex items-center gap-2">
          <Plus size={18} /> Add Zone
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search zones or pincodes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-bangalore-primary" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="p-4 font-medium">Zone Name</th>
                <th className="p-4 font-medium">City & Pincode</th>
                <th className="p-4 font-medium">Radius (Min-Max)</th>
                <th className="p-4 font-medium">Delivery Charge</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? <tr><td colSpan={6} className="p-8 text-center text-gray-500">Loading...</td></tr> : 
               filtered.length === 0 ? <tr><td colSpan={6} className="p-8 text-center text-gray-500">No zones found.</td></tr> :
               filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <MapPin size={18} />
                      </div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    {item.city}<br/>
                    <span className="text-xs font-medium text-gray-500">{item.pincode}</span>
                  </td>
                  <td className="p-4 text-gray-600">{item.minRadius}km - {item.maxRadius}km</td>
                  <td className="p-4 font-medium text-gray-900">${item.deliveryCharge}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => toggleStatus(item.id, item.isActive)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${item.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${item.isActive ? 'translate-x-4' : 'translate-x-1'}`} />
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleOpenModal(item)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit"><Edit2 size={16} /></button>
                      <button onClick={() => setConfirmDeleteId(item.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            <p className="text-gray-500 mb-6">Are you sure you want to delete this zone? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDeleteId(null)} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Zone' : 'Add Zone'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div className="overflow-y-auto p-6 flex-1">
              <form id="zone-form" onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Zone Name *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" placeholder="e.g. Downtown Area" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">City *</label>
                    <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Pincode *</label>
                    <input required type="text" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Delivery Charge ($) *</label>
                  <input required type="number" value={formData.deliveryCharge} onChange={e => setFormData({...formData, deliveryCharge: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Min Radius (km) *</label>
                    <input required type="number" step="0.1" value={formData.minRadius} onChange={e => setFormData({...formData, minRadius: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Max Radius (km) *</label>
                    <input required type="number" step="0.1" value={formData.maxRadius} onChange={e => setFormData({...formData, maxRadius: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
                  </div>
                </div>
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="rounded text-bangalore-primary" />
                    <span className="text-sm font-medium text-gray-700">Active Zone</span>
                  </label>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg text-gray-700">Cancel</button>
              <button type="submit" form="zone-form" className="px-4 py-2 bg-bangalore-primary text-white rounded-lg">Save Zone</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

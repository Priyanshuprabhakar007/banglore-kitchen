import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Settings, CreditCard, BarChart3, Shield, HelpCircle, FileText, Plus, Edit2, Trash2, Star } from 'lucide-react';

export function GenericAdminPage({ title, description, icon: Icon, collectionName }: { title: string, description: string, icon: any, collectionName: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', details: '', status: 'active' });

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, collectionName)), (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [collectionName]);

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ name: item.name || '', details: item.details || '', status: item.status || 'active' });
    } else {
      setEditingItem(null);
      setFormData({ name: '', details: '', status: 'active' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDoc(doc(db, collectionName, editingItem.id), { ...formData, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, collectionName), { ...formData, createdAt: serverTimestamp() });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error saving ${collectionName}:`, error);
    }
  };

  const handleDelete = async () => {
    if (confirmDeleteId) {
      try {
        await deleteDoc(doc(db, collectionName, confirmDeleteId));
        setConfirmDeleteId(null);
      } catch (error) {
        console.error(`Error deleting from ${collectionName}:`, error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <Icon size={24} className="text-bangalore-primary" /> {title}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-bangalore-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-bangalore-primary flex items-center gap-2">
          <Plus size={18} /> Add Record
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="p-4 font-medium">Name / Title</th>
              <th className="p-4 font-medium">Details</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? <tr><td colSpan={4} className="p-8 text-center text-gray-500">Loading...</td></tr> : 
             items.length === 0 ? <tr><td colSpan={4} className="p-8 text-center text-gray-500">No records found.</td></tr> :
             items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{item.name || 'Unnamed'}</td>
                <td className="p-4 text-gray-600 truncate max-w-xs">{item.details || 'N/A'}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleOpenModal(item)} className="p-1.5 text-gray-500 hover:text-blue-600"><Edit2 size={16} /></button>
                  <button onClick={() => setConfirmDeleteId(item.id)} className="p-1.5 text-gray-500 hover:text-red-600"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete this record? This action cannot be undone.</p>
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
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Record' : 'Add Record'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name / Title *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded-lg mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Details</label>
                <textarea rows={3} value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} className="w-full p-2 border rounded-lg mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 border rounded-lg mt-1">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg text-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-bangalore-primary text-white rounded-lg">Save</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export const RewardsManagement = () => <GenericAdminPage title="Loyalty & Rewards" description="Manage customer loyalty points and reward tiers." icon={Star} collectionName="rewards" />;
export const PaymentsManagement = () => <GenericAdminPage title="Payments & Settlements" description="View transaction history and manage payment gateways." icon={CreditCard} collectionName="payments" />;
export const ReportsManagement = () => <GenericAdminPage title="Reports & Analytics" description="Generate detailed business and sales reports." icon={BarChart3} collectionName="reports" />;
export const SettingsManagement = () => <GenericAdminPage title="System Settings" description="Configure global application settings." icon={Settings} collectionName="settings" />;
export const SupportManagement = () => <GenericAdminPage title="Support Tickets" description="Handle customer inquiries and support requests." icon={HelpCircle} collectionName="support" />;
export const ContentManagement = () => <GenericAdminPage title="Content Management" description="Manage static pages, FAQs, and policies." icon={FileText} collectionName="content" />;

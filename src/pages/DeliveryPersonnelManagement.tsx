import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Plus, Edit2, Trash2, Search, Bike, MapPin, Phone, Package, CheckCircle2, DollarSign, User } from 'lucide-react';
import { useAuth } from '../lib/auth';

function StaffDeliveryDashboard() {
  const { user, staffData } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We assume staffData has name, which was used as riderName when assigning.
    // Or we could check if there is any mapping. For robustness, let's fetch orders assigned to this name.
    const q = query(
      collection(db, 'orders'),
      where('riderName', '==', staffData?.name || user?.displayName || '')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allOrders: any[] = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      // Filter out 'delivered' if we only want active, but let's show all for today or active.
      // Let's just show active ones: out_for_delivery, assigned, ready, packed...
      const activeOrders = allOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
      // sort by date descending
      activeOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setOrders(activeOrders);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [staffData, user]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update order status.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bangalore-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">Delivery Dashboard</h2>
          <p className="text-gray-500">Welcome, {staffData?.name || user?.displayName}</p>
        </div>
        <div className="bg-bangalore-accent/10 text-bangalore-primary px-4 py-2 rounded-xl font-medium border border-bangalore-accent/20 flex items-center gap-2">
          <Bike size={20} />
          {staffData?.roleName || 'Delivery Personnel'}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Package size={20} className="text-bangalore-primary" />
            Assigned Deliveries ({orders.length})
          </h3>
        </div>
        
        <div className="p-6">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <Bike size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No delivery orders assigned yet.</p>
              <p className="text-sm text-gray-400 mt-1">When an order is assigned to you, it will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map(order => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={order.id} 
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"
                >
                  <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <span className="font-bold text-gray-900">#{order.id.slice(-6).toUpperCase()}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="p-4 flex-1 space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><User size={14} /> Customer</p>
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Phone size={14} /> Phone</p>
                      <a href={`tel:${order.customerPhone}`} className="text-bangalore-primary font-medium block">
                        {order.customerPhone}
                      </a>
                    </div>
                    
                    {order.customerAddress && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><MapPin size={14} /> Address</p>
                        <p className="text-gray-900 text-sm leading-snug">{order.customerAddress}</p>
                      </div>
                    )}

                    <div>
                       <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><DollarSign size={14} /> Amount to Collect</p>
                       <p className="font-bold text-gray-900">${order.total}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-100 bg-gray-50 grid grid-cols-1 gap-2">
                     {['assigned', 'ready', 'packed'].includes(order.status) && (
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
                          className="w-full bg-bangalore-primary text-white py-2 rounded-lg font-medium hover:bg-bangalore-primary transition-colors flex justify-center items-center gap-2"
                        >
                          <MapPin size={18} /> Out for Delivery
                        </button>
                     )}
                     
                     {order.status === 'out_for_delivery' && (
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex justify-center items-center gap-2"
                        >
                          <CheckCircle2 size={18} /> Mark as Delivered
                        </button>
                     )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DeliveryPersonnelManagement() {
  const { user, staffData } = useAuth();
  
  const isSuperAdmin = staffData?.isSuperAdmin || staffData?.permissions?.allowedSections?.includes('all');

  const [personnel, setPersonnel] = useState<any[]>([]);
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  if (!isSuperAdmin) {
    return <StaffDeliveryDashboard />;
  }

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleType: 'Bike',
    vehicleNumber: '',
    assignedZoneId: '',
    status: 'Offline' // Online, Offline, On Delivery
  });

  useEffect(() => {
    const q = query(collection(db, 'riders'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPersonnel(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    const qZones = query(collection(db, 'deliveryZones'), orderBy('name', 'asc'));
    const unsubscribeZones = onSnapshot(qZones, (snapshot) => {
      setZones(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribe();
      unsubscribeZones();
    };
  }, []);

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || '',
        phone: item.phone || '',
        vehicleType: item.vehicleType || 'Bike',
        vehicleNumber: item.vehicleNumber || '',
        assignedZoneId: item.assignedZoneId || '',
        status: item.status || 'Offline'
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        phone: '',
        vehicleType: 'Bike',
        vehicleNumber: '',
        assignedZoneId: '',
        status: 'Offline'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { 
        ...formData, 
        updatedAt: serverTimestamp()
      };
      
      if (editingItem) {
        await updateDoc(doc(db, 'riders', editingItem.id), data);
      } else {
        await addDoc(collection(db, 'riders'), {
          ...data,
          totalDeliveries: 0,
          earnings: 0,
          createdAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving delivery person:", error);
    }
  };

  const handleDelete = async () => {
    if (confirmDeleteId) {
      try {
        await deleteDoc(doc(db, 'riders', confirmDeleteId));
        setConfirmDeleteId(null);
      } catch (error) {
        console.error("Error deleting delivery person:", error);
      }
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'riders', id), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filtered = personnel.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Delivery Personnel</h1>
          <p className="text-gray-500 text-sm mt-1">Manage riders, their zones, and availability.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-bangalore-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-bangalore-primary flex items-center gap-2">
          <Plus size={18} /> Add Rider
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search by name or phone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-bangalore-primary" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="p-4 font-medium">Rider Details</th>
                <th className="p-4 font-medium">Vehicle</th>
                <th className="p-4 font-medium">Assigned Zone</th>
                <th className="p-4 font-medium">Performance</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? <tr><td colSpan={6} className="p-8 text-center text-gray-500">Loading...</td></tr> : 
               filtered.length === 0 ? <tr><td colSpan={6} className="p-8 text-center text-gray-500">No riders found.</td></tr> :
               filtered.map((item) => {
                 const zone = zones.find(z => z.id === item.assignedZoneId);
                 return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 block">{item.name}</span>
                          <span className="text-xs text-gray-500 flex items-center gap-1"><Phone size={12} /> {item.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Bike size={16} className="text-gray-400" />
                        <span>{item.vehicleType}</span>
                      </div>
                      <span className="text-xs text-gray-500">{item.vehicleNumber}</span>
                    </td>
                    <td className="p-4">
                      {zone ? (
                        <div className="flex items-center gap-1 text-gray-700">
                          <MapPin size={14} className="text-bangalore-primary" />
                          <span>{zone.name}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Unassigned</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <span className="text-gray-500">Deliveries:</span> <span className="font-medium text-gray-900">{item.totalDeliveries || 0}</span><br/>
                        <span className="text-gray-500">Earnings:</span> <span className="font-medium text-gray-900">${item.earnings || 0}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <select 
                        value={item.status}
                        onChange={(e) => updateStatus(item.id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded outline-none border-none
                          ${item.status === 'Online' ? 'bg-green-100 text-green-800' : 
                            item.status === 'On Delivery' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'}`}
                      >
                        <option value="Offline">Offline</option>
                        <option value="Online">Online</option>
                        <option value="On Delivery">On Delivery</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenModal(item)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit"><Edit2 size={16} /></button>
                        <button onClick={() => setConfirmDeleteId(item.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                 );
               })}
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
            <p className="text-gray-500 mb-6">Are you sure you want to delete this rider? This action cannot be undone.</p>
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
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Rider' : 'Add Rider'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div className="overflow-y-auto p-6 flex-1">
              <form id="rider-form" onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Vehicle Type</label>
                    <select value={formData.vehicleType} onChange={e => setFormData({...formData, vehicleType: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary">
                      <option value="Bike">Bike</option>
                      <option value="Scooter">Scooter</option>
                      <option value="Car">Car</option>
                      <option value="Bicycle">Bicycle</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Vehicle Number</label>
                    <input type="text" value={formData.vehicleNumber} onChange={e => setFormData({...formData, vehicleNumber: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Assigned Zone</label>
                  <select value={formData.assignedZoneId} onChange={e => setFormData({...formData, assignedZoneId: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary">
                    <option value="">Select a zone...</option>
                    {zones.map(z => (
                      <option key={z.id} value={z.id}>{z.name} ({z.city})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Current Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 border rounded-lg mt-1 outline-none focus:border-bangalore-primary">
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                    <option value="On Delivery">On Delivery</option>
                  </select>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg text-gray-700">Cancel</button>
              <button type="submit" form="rider-form" className="px-4 py-2 bg-bangalore-primary text-white rounded-lg">Save Rider</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

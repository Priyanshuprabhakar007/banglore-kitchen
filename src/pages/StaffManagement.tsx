import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../lib/auth';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { logActivity } from '../lib/activityLog';
import { Shield, Users, Key, History, Plus, Edit2, Trash2, Check, X, Search, ChevronDown, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

const AVAILABLE_SECTIONS = [
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'menu', name: 'Menu Management' },
  { id: 'categories', name: 'Categories' },
  { id: 'offers', name: 'Offers & Coupons' },
  { id: 'orders', name: 'Orders' },
  { id: 'bookings', name: 'Table Bookings' },
  { id: 'branches', name: 'Branches' },
  { id: 'zones', name: 'Delivery Zones' },
  { id: 'delivery', name: 'Delivery Personnel' },
  { id: 'customers', name: 'Customers' },
  { id: 'announcements', name: 'App Announcements' },
  { id: 'notifications', name: 'Notifications' },
  { id: 'banners', name: 'Banners & Promos' },
  { id: 'reviews', name: 'Reviews' },
  { id: 'rewards', name: 'Loyalty & Rewards' },
  { id: 'payments', name: 'Payments' },
  { id: 'reports', name: 'Reports' },
  { id: 'branding', name: 'App & Web Branding' },
  { id: 'staff', name: 'Staff & Roles' },
  { id: 'support', name: 'Support Tickets' },
  { id: 'content', name: 'Content' },
];

const ORDER_STATUSES = ['Accepted', 'Preparing', 'Food Ready', 'Packed', 'Out for Delivery', 'Delivered', 'Cancelled'];

const ACTION_PERMISSIONS: Record<string, string[]> = {
  orders: ['View Orders', 'Accept Orders', 'Update Order Status', 'Print KOT / Bill', 'Assign Rider', 'Cancel Order', 'View Customer Details'],
  menu: ['View Menu', 'Add Product', 'Edit Product', 'Delete Product', 'Change Availability'],
  payments: ['View Payments', 'Mark Payment Received', 'Refund Payment', 'Export Payment Report'],
};

export function StaffManagement() {
  const { user, staffData } = useAuth();
  const [activeTab, setActiveTab] = useState<'staff' | 'roles' | 'permissions' | 'activity'>('staff');
  
  const [staffList, setStaffList] = useState<any[]>([]);
  const [rolesList, setRolesList] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string, type: 'staff' | 'role' } | null>(null);

  // Forms
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [staffForm, setStaffForm] = useState({
    name: '', email: '', phone: '', pin: '', roleId: '', branchId: '', status: 'active'
  });

  const [editingRole, setEditingRole] = useState<any>(null);
  const [roleForm, setRoleForm] = useState({
    roleName: '', description: '', allowedSections: [] as string[], orderStatusPermissions: [] as string[], actionPermissions: {} as Record<string, string[]>
  });

  useEffect(() => {
    const unsubStaff = onSnapshot(collection(db, 'staffMembers'), (snap) => setStaffList(snap.docs.map(d => ({ id: d.id, ...d.data() }))), (error) => handleFirestoreError(error, OperationType.LIST, 'staffMembers'));
    const unsubRoles = onSnapshot(collection(db, 'roles'), (snap) => setRolesList(snap.docs.map(d => ({ id: d.id, ...d.data() }))), (error) => handleFirestoreError(error, OperationType.LIST, 'roles'));
    const unsubLogs = onSnapshot(query(collection(db, 'activityLogs'), orderBy('createdAt', 'desc')), (snap) => setActivityLogs(snap.docs.map(d => ({ id: d.id, ...d.data() }))), (error) => handleFirestoreError(error, OperationType.LIST, 'activityLogs'));
    const unsubBranches = onSnapshot(collection(db, 'branches'), (snap) => setBranches(snap.docs.map(d => ({ id: d.id, ...d.data() }))), (error) => handleFirestoreError(error, OperationType.LIST, 'branches'));

    setLoading(false);
    return () => { unsubStaff(); unsubRoles(); unsubLogs(); unsubBranches(); };
  }, []);

  const hasAccess = (section: string) => {
    if (staffData?.isSuperAdmin || staffData?.permissions?.allowedSections?.includes('all')) return true;
    return staffData?.permissions?.allowedSections?.includes(section);
  };

  if (!hasAccess('staff')) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center h-[60vh]">
        <Lock className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Access Denied</h2>
        <p className="text-gray-500">You do not have permission to access Staff & Roles.</p>
      </div>
    );
  }

  const handleOpenStaffModal = (staff: any = null) => {
    if (staff) {
      setEditingStaff(staff);
      setStaffForm({
        name: staff.name || '', email: staff.email || '', phone: staff.phone || '', pin: '', 
        roleId: staff.roleId || '', branchId: staff.branchId || '', status: staff.status || 'active'
      });
    } else {
      setEditingStaff(null);
      setStaffForm({ name: '', email: '', phone: '', pin: '', roleId: '', branchId: '', status: 'active' });
    }
    setIsStaffModalOpen(true);
  };

  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const roleDoc = rolesList.find(r => r.id === staffForm.roleId);
      
      if (editingStaff) {
        await updateDoc(doc(db, 'staffMembers', editingStaff.id), {
          name: staffForm.name,
          phone: staffForm.phone,
          roleId: staffForm.roleId,
          roleName: roleDoc?.roleName || '',
          branchId: staffForm.branchId,
          status: staffForm.status,
          permissions: roleDoc || {},
          updatedAt: serverTimestamp()
        });
        await logActivity(user?.uid || '', staffData?.name || user?.displayName || 'Admin', staffData?.roleName || 'Super Admin', 'Updated Staff', 'Staff & Roles', editingStaff.name, staffForm.name);
      } else {
        if (!staffForm.email || !staffForm.pin) {
          alert('Email (or Mobile appended with @domain) and PIN are required for new staff.');
          return;
        }

        let emailToUse = staffForm.email;
        if (/^\d{10}$/.test(emailToUse)) {
          emailToUse = `${emailToUse}@basant.com`;
        }

        // Initialize secondary app to create user without signing out current
        const secondaryApp = initializeApp(firebaseConfig, 'SecondaryApp');
        const secondaryAuth = getAuth(secondaryApp);
        
        try {
          const userCredential = await createUserWithEmailAndPassword(secondaryAuth, emailToUse, staffForm.pin);
          const newUid = userCredential.user.uid;
          
          await setDoc(doc(db, 'staffMembers', newUid), {
            uid: newUid,
            name: staffForm.name,
            email: emailToUse,
            phone: staffForm.phone,
            roleId: staffForm.roleId,
            roleName: roleDoc?.roleName || '',
            branchId: staffForm.branchId,
            status: staffForm.status,
            permissions: roleDoc || {},
            createdAt: serverTimestamp()
          });

          await logActivity(user?.uid || '', staffData?.name || user?.displayName || 'Admin', staffData?.roleName || 'Super Admin', 'Created Staff', 'Staff & Roles', null, staffForm.name);
          
        } catch (createUserErr: any) {
          alert(`Error creating authentication record: ${createUserErr.message}`);
          return;
        }
      }
      setIsStaffModalOpen(false);
    } catch (error) {
       console.error("Error saving staff", error);
    }
  };

  const handleOpenRoleModal = (role: any = null) => {
    if (role) {
      setEditingRole(role);
      setRoleForm({
        ...role,
      });
    } else {
      setEditingRole(null);
      setRoleForm({ roleName: '', description: '', allowedSections: [], orderStatusPermissions: [], actionPermissions: {} });
    }
    setIsRoleModalOpen(true);
  };

  const handleSaveRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRole) {
        await updateDoc(doc(db, 'roles', editingRole.id), {
          ...roleForm,
          updatedAt: serverTimestamp()
        });
        await logActivity(user?.uid || '', staffData?.name || user?.displayName || 'Admin', staffData?.roleName || 'Super Admin', 'Updated Role', 'Staff & Roles', editingRole.roleName, roleForm.roleName);
      } else {
        await addDoc(collection(db, 'roles'), {
          ...roleForm,
          createdAt: serverTimestamp()
        });
        await logActivity(user?.uid || '', staffData?.name || user?.displayName || 'Admin', staffData?.roleName || 'Super Admin', 'Created Role', 'Staff & Roles', null, roleForm.roleName);
      }
      setIsRoleModalOpen(false);
    } catch (error) {
      console.error("Error saving role", error);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      const coll = confirmDelete.type === 'staff' ? 'staffMembers' : 'roles';
      await deleteDoc(doc(db, coll, confirmDelete.id));
      await logActivity(user?.uid || '', staffData?.name || user?.displayName || 'Admin', staffData?.roleName || 'Super Admin', `Deleted ${confirmDelete.type}`, 'Staff & Roles');
      setConfirmDelete(null);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  const toggleArrayItem = (array: string[], item: string, setFn: (arr: string[]) => void) => {
    if (array.includes(item)) {
      setFn(array.filter(i => i !== item));
    } else {
      setFn([...array, item]);
    }
  };

  const toggleActionPermission = (section: string, action: string) => {
    const currentActions = roleForm.actionPermissions[section] || [];
    let newActions;
    if (currentActions.includes(action)) {
      newActions = currentActions.filter(a => a !== action);
    } else {
      newActions = [...currentActions, action];
    }
    setRoleForm({
      ...roleForm,
      actionPermissions: { ...roleForm.actionPermissions, [section]: newActions }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <Shield size={24} className="text-bangalore-primary" /> Staff & Roles Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage employee access, roles, and track system activity.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex flex-wrap gap-2">
        {[
          { id: 'staff', label: 'Staff Members', icon: Users },
          { id: 'roles', label: 'Roles & Permissions', icon: Key },
          { id: 'activity', label: 'Activity Logs', icon: History }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors",
              activeTab === tab.id 
                ? "bg-bangalore-primary text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
        {/* STAFF TAB */}
        {activeTab === 'staff' && (
          <div>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="font-bold text-gray-800">Staff Directory</h2>
              <button onClick={() => handleOpenStaffModal()} className="bg-bangalore-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-bangalore-primary flex items-center gap-2 shadow-sm">
                <Plus size={16} /> Add Staff
              </button>
            </div>
            {loading ? <div className="p-8 text-center text-gray-500">Loading staff...</div> : (
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead className="bg-gray-50 text-gray-500 text-xs text-transform uppercase font-medium">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Branch</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {staffList.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-gray-500 font-medium">No staff members found.</td></tr>}
                    {staffList.map(staff => (
                      <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900 border-b-0">{staff.name}</td>
                        <td className="px-6 py-4 border-b-0">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                            {staff.roleName || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 border-b-0">
                          <p>{staff.email}</p>
                          <p className="text-xs text-gray-400">{staff.phone}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 border-b-0">
                          {branches.find(b => b.id === staff.branchId)?.name || 'All Branches'}
                        </td>
                        <td className="px-6 py-4 border-b-0">
                          <span className={cn(
                            "px-2.5 py-1 rounded-md text-xs font-bold uppercase",
                            staff.status === 'active' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          )}>
                            {staff.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right border-b-0">
                          <button onClick={() => handleOpenStaffModal(staff)} className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors mx-1 bg-white rounded shadow-sm border border-gray-100"><Edit2 size={16} /></button>
                          <button onClick={() => setConfirmDelete({ id: staff.id, type: 'staff' })} className="p-1.5 text-gray-500 hover:text-red-600 transition-colors mx-1 bg-white rounded shadow-sm border border-gray-100"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ROLES TAB */}
        {activeTab === 'roles' && (
          <div>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="font-bold text-gray-800">Role Definitions</h2>
              <button onClick={() => handleOpenRoleModal()} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black flex items-center gap-2 shadow-sm">
                <Plus size={16} /> Create Role
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rolesList.map(role => (
                <div key={role.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all bg-white relative group flex flex-col">
                  <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenRoleModal(role)} className="p-1.5 text-gray-500 hover:text-blue-600 bg-white rounded-md shadow-sm border border-gray-100 mr-2"><Edit2 size={14} /></button>
                    <button onClick={() => setConfirmDelete({ id: role.id, type: 'role' })} className="p-1.5 text-gray-500 hover:text-red-600 bg-white rounded-md shadow-sm border border-gray-100"><Trash2 size={14} /></button>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                      <Key size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{role.roleName}</h3>
                      <p className="text-xs text-gray-500">{staffList.filter(s => s.roleId === role.id).length} staff members</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 flex-1">{role.description}</p>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Access</p>
                    <div className="flex flex-wrap gap-1.5">
                      {role.allowedSections?.includes('all') ? (
                         <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">Full Access</span>
                      ) : (
                        role.allowedSections?.slice(0, 5).map((s: string) => (
                          <span key={s} className="px-2 py-0.5 rounded text-xs font-medium bg-white border border-gray-200 text-gray-700">
                            {AVAILABLE_SECTIONS.find(as => as.id === s)?.name || s}
                          </span>
                        ))
                      )}
                      {(role.allowedSections?.length > 5 && !role.allowedSections?.includes('all')) && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">+{role.allowedSections.length - 5} more</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVITY LOGS TAB */}
        {activeTab === 'activity' && (
          <div>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="font-bold text-gray-800">System Activity Logs</h2>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                    <tr>
                      <th className="px-6 py-4">Date & Time</th>
                      <th className="px-6 py-4">Staff Member</th>
                      <th className="px-6 py-4">Action</th>
                      <th className="px-6 py-4">Section/Context</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {activityLogs.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-gray-500">No activity logged yet.</td></tr>}
                    {activityLogs.map(log => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 border-b-0 whitespace-nowrap text-gray-500">
                          {log.createdAt ? new Date(log.createdAt.toDate?.() || log.createdAt).toLocaleString() : 'Just now'}
                        </td>
                        <td className="px-6 py-4 border-b-0 font-medium">
                          {log.userName} <span className="text-gray-400 text-xs ml-1">({log.roleName})</span>
                        </td>
                        <td className="px-6 py-4 border-b-0">
                          <span className={cn("px-2 py-1 rounded text-xs font-medium", log.action.includes('Delete') ? 'bg-red-50 text-red-700' : 'bg-gray-100')}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 border-b-0 text-gray-600">
                          <span className="font-medium">{log.section}</span>
                          {log.newValue && <span className="text-xs ml-2 text-gray-500">→ {log.newValue}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}
      </div>

      {/* Staff Modal */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
              <h2 className="text-lg font-bold text-gray-900">{editingStaff ? 'Edit Staff Member' : 'Add New Staff'}</h2>
              <button onClick={() => setIsStaffModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"><X size={20} /></button>
            </div>
            <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
              <form id="staff-form" onSubmit={handleSaveStaff} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name *</label>
                    <input required type="text" value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="e.g. Rajesh Kumar" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email / Mobile ID *</label>
                    <input required disabled={!!editingStaff} type="text" value={staffForm.email} onChange={e => setStaffForm({...staffForm, email: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm disabled:opacity-50" placeholder="e.g. 9876543210" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</label>
                    <input type="tel" value={staffForm.phone} onChange={e => setStaffForm({...staffForm, phone: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="Optional contact" />
                  </div>
                  {!editingStaff && (
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Login PIN / Password *</label>
                      <input required type="password" value={staffForm.pin} onChange={e => setStaffForm({...staffForm, pin: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="Set a secure PIN or password" minLength={6} />
                      <p className="text-xs text-gray-400 mt-1">Minimum 6 characters required for secure login.</p>
                    </div>
                  )}
                  <div className="col-span-2 sm:col-span-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-sm font-medium text-gray-700">Assign Role *</label>
                      {rolesList.length === 0 && (
                        <button type="button" onClick={() => setActiveTab('roles')} className="text-xs text-bangalore-primary hover:underline">Create Role &rarr;</button>
                      )}
                    </div>
                    <select required value={staffForm.roleId} onChange={e => setStaffForm({...staffForm, roleId: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                      <option value="">Select a role...</option>
                      {rolesList.length === 0 && <option disabled value="">No roles found - Create one first</option>}
                      {rolesList.map(r => <option key={r.id} value={r.id}>{r.roleName}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-sm font-medium text-gray-700">Branch</label>
                      {branches.length === 0 && (
                        <span className="text-xs text-gray-500">No branches found</span>
                      )}
                    </div>
                    <select value={staffForm.branchId} onChange={e => setStaffForm({...staffForm, branchId: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                      <option value="">All Branches</option>
                      {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                     <label className="text-sm font-medium text-gray-700 mb-1.5 block">Account Status</label>
                     <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="status" value="active" checked={staffForm.status === 'active'} onChange={e => setStaffForm({...staffForm, status: e.target.value})} className="text-bangalore-primary focus:ring-bangalore-primary" /> Active
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="status" value="inactive" checked={staffForm.status === 'inactive'} onChange={e => setStaffForm({...staffForm, status: e.target.value})} className="text-gray-500 focus:ring-gray-500" /> Inactive
                        </label>
                     </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 shrink-0">
              <button type="button" onClick={() => setIsStaffModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-200 transition-colors">Cancel</button>
              <button type="submit" form="staff-form" className="px-5 py-2.5 rounded-xl font-medium bg-bangalore-primary text-white hover:bg-bangalore-primary shadow-md transition-colors">
                {editingStaff ? 'Save Changes' : 'Create Staff Member'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Role Modal */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{editingRole ? 'Edit Role Permissions' : 'Create Custom Role'}</h2>
                <p className="text-gray-500 text-sm mt-0.5">Define what users in this role can see and do.</p>
              </div>
              <button onClick={() => setIsRoleModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"><X size={20} /></button>
            </div>
            <div className="overflow-y-auto p-4 sm:p-6 flex-1 custom-scrollbar bg-gray-50 flex flex-col gap-6">
              <form id="role-form" onSubmit={handleSaveRole} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Role Title *</label>
                    <input required type="text" value={roleForm.roleName} onChange={e => setRoleForm({...roleForm, roleName: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="e.g. Cook, Delivery Manager" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Short Description</label>
                    <input type="text" value={roleForm.description} onChange={e => setRoleForm({...roleForm, description: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="What does this role do?" />
                  </div>
                </div>
              </form>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Section Access */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">1. Section Access</h3>
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-bangalore-primary bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-100 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={roleForm.allowedSections.includes('all')}
                        onChange={() => setRoleForm({...roleForm, allowedSections: roleForm.allowedSections.includes('all') ? [] : ['all']})}
                        className="rounded text-bangalore-primary focus:ring-bangalore-primary" 
                      />
                      Give Full Admin Access
                    </label>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 h-[300px]">
                    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-3", roleForm.allowedSections.includes('all') && "opacity-50 pointer-events-none")}>
                      {AVAILABLE_SECTIONS.map(section => (
                        <label key={section.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                          <input 
                            type="checkbox" 
                            checked={roleForm.allowedSections.includes(section.id)}
                            onChange={() => toggleArrayItem(roleForm.allowedSections, section.id, (arr) => setRoleForm({...roleForm, allowedSections: arr}))}
                            className="rounded w-4 h-4 text-bangalore-primary focus:ring-bangalore-primary" 
                          />
                          <span className="text-sm font-medium text-gray-700">{section.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Granular Permissions */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full">
                  <h3 className="font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">2. Specific Action & Status Permissions</h3>
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 h-[300px] space-y-6">
                    {/* Order Statuses */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded-lg inline-block">Allowed Order Status Updates</h4>
                      <div className="flex flex-wrap gap-2">
                        {ORDER_STATUSES.map(status => (
                          <label key={status} className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium cursor-pointer transition-colors shadow-sm",
                            roleForm.orderStatusPermissions.includes(status) ? "bg-bangalore-primary/5 border-bangalore-primary/30 text-bangalore-primary" : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"
                          )}>
                            <input 
                              type="checkbox"
                              checked={roleForm.orderStatusPermissions.includes(status)}
                              onChange={() => toggleArrayItem(roleForm.orderStatusPermissions, status, (arr) => setRoleForm({...roleForm, orderStatusPermissions: arr}))}
                              className="hidden"
                            />
                            {roleForm.orderStatusPermissions.includes(status) && <Check size={14} />}
                            {status}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Action Permissions */}
                    {Object.entries(ACTION_PERMISSIONS).map(([sectionId, actions]) => {
                      const sectionName = AVAILABLE_SECTIONS.find(s => s.id === sectionId)?.name || sectionId;
                      // Only show granular actions if they have access to the section or have "all"
                      if (!roleForm.allowedSections.includes('all') && !roleForm.allowedSections.includes(sectionId)) return null;

                      return (
                        <div key={sectionId}>
                          <h4 className="text-sm font-bold text-gray-800 mb-3 bg-gray-50 px-3 py-2 rounded-lg inline-block">{sectionName} Actions</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {actions.map(action => (
                              <label key={action} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                                <input 
                                  type="checkbox"
                                  checked={roleForm.actionPermissions?.[sectionId]?.includes(action) || false}
                                  onChange={() => toggleActionPermission(sectionId, action)}
                                  className="rounded w-4 h-4 text-gray-600 focus:ring-gray-600"
                                />
                                {action}
                              </label>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-gray-100 flex justify-end gap-3 bg-white shrink-0">
              <button type="button" onClick={() => setIsRoleModalOpen(false)} className="px-6 py-2.5 rounded-xl font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" form="role-form" className="px-6 py-2.5 rounded-xl font-medium bg-gray-900 text-white hover:bg-black shadow-md transition-colors">
                {editingRole ? 'Save Changes' : 'Create Role'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center border border-gray-100">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5 border border-red-100 shadow-inner">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">Confirm Delete</h3>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">Are you sure you want to delete this {confirmDelete.type}? The linked access will be revoked permanently.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 shadow-md shadow-red-600/20 transition-colors">Delete</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

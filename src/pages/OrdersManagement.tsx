import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot, updateDoc, doc, query, orderBy, getDocs, where, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../lib/auth';
import { logActivity } from '../lib/activityLog';
import { Search, Filter, Clock, MapPin, Phone, CheckCircle2, XCircle, ChefHat, Bike, ShoppingBag, User, Printer, CheckSquare, Square } from 'lucide-react';

export function OrdersManagement() {
  const [orders, setOrders] = useState<any[]>([]);
  const [riders, setRiders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const previousOrderCount = useRef(0);
  
  const { user, staffData } = useAuth();
  
  const hasActionPermission = (action: string) => {
    if (!staffData || staffData.isSuperAdmin || staffData.permissions?.allowedSections?.includes('all')) return true;
    return staffData.permissions?.actionPermissions?.['orders']?.includes(action);
  };
  
  const hasStatusPermission = (internalStatus: string) => {
    if (!staffData || staffData.isSuperAdmin || staffData.permissions?.allowedSections?.includes('all')) return true;
    
    // Map internal status to UI status label defined in StaffManagement
    const statusMap: Record<string, string> = {
      'accepted': 'Accepted',
      'preparing': 'Preparing',
      'ready': 'Food Ready',
      'packed': 'Packed',
      'out_for_delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled',
      'failed': 'Cancelled'
    };
    
    const uiLabel = statusMap[internalStatus];
    if (!uiLabel) return true; // defaults to true for un-mapped ones
    
    return staffData.permissions?.orderStatusPermissions?.includes(uiLabel);
  };

  // Play sound when a new order comes in
  useEffect(() => {
    if (loading) return;
    if (previousOrderCount.current === 0 && orders.length > 0) {
      previousOrderCount.current = orders.length;
      return;
    }
    if (orders.length > previousOrderCount.current) {
      try {
        const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
        audio.play().catch(e => console.log('Audio play prevented by browser policy'));
      } catch(e) {}
    }
    previousOrderCount.current = orders.length;
  }, [orders, loading]);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'orders');
      setLoading(false);
    });

    const qRiders = query(collection(db, 'riders'));
    const unsubscribeRiders = onSnapshot(qRiders, (snapshot) => {
      setRiders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'riders');
    });

    return () => {
      unsubscribe();
      unsubscribeRiders();
    };
  }, []);

  const updateOrderStatus = async (id: string, newStatus: string) => {
    if (!hasStatusPermission(newStatus)) {
      alert("You do not have permission to update to this status.");
      return;
    }
    
    try {
      const existing = orders.find(o => o.id === id);
      try {
        await updateDoc(doc(db, 'orders', id), { 
          status: newStatus,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `orders/${id}`);
      }
      // Also update workflow flags for convenience based on status
      if (newStatus === 'ready') await toggleWorkflowFlag(id, 'foodPrepared', true);
      if (newStatus === 'packed') await toggleWorkflowFlag(id, 'readyForPickup', true);
      
      await logActivity(user?.uid || '', staffData?.name || user?.displayName || 'Admin', staffData?.roleName || 'Super Admin', `Updated Order Status`, 'Orders', existing?.status, newStatus);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update status. Check permissions.");
    }
  };

  const assignRider = async (orderId: string, riderId: string) => {
    if (!hasActionPermission('Assign Rider')) {
      alert("You do not have permission to assign riders.");
      return;
    }
    try {
      const rider = riders.find(r => r.id === riderId);
      await updateDoc(doc(db, 'orders', orderId), { 
        riderId: riderId,
        riderName: rider?.name || 'Unknown Rider',
        status: 'assigned',
        assignedAt: serverTimestamp()
      });
      await logActivity(user?.uid || '', staffData?.name || user?.displayName || 'Admin', staffData?.roleName || 'Super Admin', `Assigned Rider`, 'Orders', null, rider?.name);
    } catch (error) {
      console.error("Error assigning rider:", error);
      alert("Failed to assign rider.");
    }
  };

  const toggleWorkflowFlag = async (orderId: string, flag: string, value: boolean) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        [flag]: value
      });
    } catch (error) {
       console.error("Error updating flag:", error);
    }
  };

  const printBill = (order: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    // Auto-mark bill printed
    if (!order.billPrinted) {
      toggleWorkflowFlag(order.id, 'billPrinted', true);
    }

    let orderDateStr = new Date().toLocaleString();
    if (order.createdAt) {
      if (typeof order.createdAt.toDate === 'function') {
        orderDateStr = order.createdAt.toDate().toLocaleString();
      } else if (order.createdAt.seconds) {
        orderDateStr = new Date(order.createdAt.seconds * 1000).toLocaleString();
      } else {
        const d = new Date(order.createdAt);
        if (!isNaN(d.getTime())) orderDateStr = d.toLocaleString();
      }
    }

    const orderId = order.orderId || order.id || 'N/A';
    const displayId = orderId.toString().length > 6 ? orderId.toString().slice(-6).toUpperCase() : orderId.toString().toUpperCase();
    
    // Improved field fallbacks for different schemas (Web vs Mobile app)
    const customerName = order.customerName || order.userName || order.name || order.user_name || order.deliveryAddress?.name || order.user?.name || 'Guest';
    const customerPhone = order.customerPhone || order.userPhone || order.phone || order.user_phone || order.deliveryAddress?.phone || order.user?.phone || 'N/A';
    const orderType = (order.orderType || order.order_type || order.serviceMode || 'DELIVERY').toString().toUpperCase();
    
    const paymentMethod = (order.paymentMethod || order.paymentType || order.payment_method || order.payment_mode || 'CASH').toString().toUpperCase();
    const paymentStatus = order.paymentStatus || order.payment_status || 'Pending';
    
    let totalAmount = Number(order.total || order.totalAmount || order.total_amount || order.totalPrice || order.total_price || order.finalTotal || 0);
    if (!totalAmount && order.items && Array.isArray(order.items)) {
      totalAmount = order.items.reduce((sum: number, item: any) => sum + ((Number(item.price) || Number(item.totalPrice) || 0) * (Number(item.quantity) || 1)), 0);
      totalAmount += Number(order.taxesAndCharges?.tax || order.tax || 0) + Number(order.taxesAndCharges?.deliveryFee || order.deliveryFee || 0);
    }
    
    const offerCode = order.offerCode || order.couponCode || order.promoCode || order.coupon_code || '';
    const discount = order.discount || order.discountAmount || order.coupon_discount || 0;

    const html = `
      <html>
        <head>
          <title>KOT - ${displayId}</title>
          <style>
            body { font-family: monospace; padding: 20px; max-width: 300px; margin: 0 auto; color: #000; }
            .header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 10px; margin-bottom: 10px; }
            .title { font-size: 24px; font-weight: bold; margin: 0 0 5px 0; }
            .subtitle { font-size: 14px; margin: 0; }
            .details { margin-bottom: 10px; font-size: 14px; }
            .items { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
            .items th { text-align: left; border-bottom: 1px dashed #000; padding: 5px 0; }
            .items td { padding: 5px 0; font-size: 14px; }
            .total { border-top: 2px dashed #000; padding-top: 10px; font-weight: bold; text-align: right; font-size: 16px; }
            .offer-line { font-size: 12px; font-weight: normal; margin-bottom: 5px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; }
            .instructions { border: 1px solid #000; padding: 5px; margin: 10px 0; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">The Bangalore Kitchen</h1>
            <p class="subtitle">Kitchen Order Ticket</p>
          </div>
          <div class="details">
            <div><strong>Order ID:</strong> #${displayId}</div>
            <div><strong>Date:</strong> ${orderDateStr}</div>
            <div><strong>Type:</strong> ${orderType}</div>
            <div><strong>Customer:</strong> ${customerName}</div>
            <div><strong>Phone:</strong> ${customerPhone}</div>
          </div>
          ${order.specialInstructions ? `<div class="instructions">Notes: ${order.specialInstructions}</div>` : ''}
          <table class="items">
            <thead>
              <tr><th>Item</th><th>Qty</th><th>Amt</th></tr>
            </thead>
            <tbody>
              ${(order.items || []).map((item: any) => `
                <tr>
                  <td>${item.name || item.title || 'Item'}</td>
                  <td>x${Math.abs(Number(item.quantity) || 1)}</td>
                  <td>$${(Number(item.price) || Number(item.totalPrice) || 0) * Math.abs(Number(item.quantity) || 1)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">
            ${offerCode ? `<div class="offer-line">Offer applied: ${offerCode} (-$${discount})</div>` : ''}
            Total: $${totalAmount}
          </div>
          <div class="details" style="margin-top: 10px;">
            <div><strong>Payment:</strong> ${paymentMethod} - ${paymentStatus}</div>
          </div>
          <div class="footer">
            --- End of Receipt ---
          </div>
          <script>
            window.onload = () => { window.print(); window.close(); };
          </script>
        </body>
      </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone?.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'ready': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'packed': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'assigned': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'out_for_delivery': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <Clock size={14} className="mr-1" />;
      case 'accepted': return <CheckCircle2 size={14} className="mr-1" />;
      case 'preparing': return <ChefHat size={14} className="mr-1" />;
      case 'packed': return <ShoppingBag size={14} className="mr-1" />;
      case 'assigned': return <User size={14} className="mr-1" />;
      case 'out_for_delivery': return <Bike size={14} className="mr-1" />;
      case 'delivered': return <CheckCircle2 size={14} className="mr-1" />;
      case 'cancelled': return <XCircle size={14} className="mr-1" />;
      case 'failed': return <XCircle size={14} className="mr-1" />;
      default: return null;
    }
  };

  // Metrics calculating
  const totalSales = orders.filter(o => o.status === 'delivered').reduce((acc, o) => {
    let orderTotal = Number(o.total || o.totalAmount || o.total_amount || o.totalPrice || o.finalTotal || 0);
    if (!orderTotal && o.items && Array.isArray(o.items)) {
      orderTotal = o.items.reduce((sum: number, item: any) => sum + ((Number(item.price) || Number(item.totalPrice) || 0) * (Number(item.quantity) || 1)), 0);
      orderTotal += Number(o.taxesAndCharges?.tax || o.tax || 0) + Number(o.taxesAndCharges?.deliveryFee || o.deliveryFee || 0);
    }
    return acc + orderTotal;
  }, 0);
  const totalOrders = orders.length;
  const pendingOrdersCount = orders.filter(o => ['pending', 'accepted', 'preparing', 'ready', 'packed'].includes(o.status)).length;
  const completedOrdersCount = orders.filter(o => o.status === 'delivered').length;
  const cancelledOrdersCount = orders.filter(o => o.status === 'cancelled').length;


  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">Live Orders <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">Live</span></h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track incoming orders in real-time.</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Sales</p>
          <p className="text-xl font-black text-bangalore-primary">${totalSales.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Orders</p>
          <p className="text-xl font-black text-gray-900">{totalOrders}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm flex flex-col items-center">
          <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Active</p>
          <p className="text-xl font-black text-blue-900">{pendingOrdersCount}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-100 shadow-sm flex flex-col items-center">
          <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">Completed</p>
          <p className="text-xl font-black text-green-900">{completedOrdersCount}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm flex flex-col items-center">
          <p className="text-xs text-red-600 font-bold uppercase tracking-wider mb-1">Cancelled</p>
          <p className="text-xl font-black text-red-900">{cancelledOrdersCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between shrink-0 bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Order ID, Name, Phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bangalore-primary/20 focus:border-bangalore-primary transition-all bg-white"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
            {['all', 'pending', 'preparing', 'packed', 'out_for_delivery', 'delivered'].map(status => (
              <button 
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  statusFilter === status 
                    ? 'bg-bangalore-primary text-white shadow-sm' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-gray-50/30">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bangalore-primary"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <ShoppingBag size={48} className="text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900">No orders found</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3 gap-4">
              {filteredOrders.map((order, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={order.id} 
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col relative"
                >
                  <div className="p-4 border-b border-gray-100 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">#{order.id.slice(-6).toUpperCase()}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.replace(/_/g, ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-bangalore-primary text-lg">${(order.total || order.totalAmount || order.total_amount || order.totalPrice || order.finalTotal || 0).toLocaleString()}</p>
                      <p className="text-xs text-gray-500 uppercase font-medium">{order.orderType?.replace('_', ' ') || order.serviceMode || 'DELIVERY'}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1">
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-bold text-gray-900">Customer Details</h4>
                        {hasActionPermission('Print KOT / Bill') && (
                          <button 
                            onClick={() => printBill(order)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 transition-colors"
                          >
                            <Printer size={12} /> Print Bill
                          </button>
                        )}
                      </div>
                      
                      {hasActionPermission('View Customer Details') ? (
                        <>
                          <p className="text-sm text-gray-700 font-medium">{order.customerName || order.userName || order.name || order.user_name || order.deliveryAddress?.name || order.user?.name || 'Guest'}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Phone size={12} /> {order.customerPhone || order.userPhone || order.phone || order.user_phone || order.deliveryAddress?.phone || order.user?.phone || 'N/A'}
                          </p>
                          {(!order.orderType || order.orderType === 'delivery' || order.serviceMode === 'Delivery') && (
                            <p className="text-xs text-gray-500 flex items-start gap-1 mt-1">
                              <MapPin size={12} className="shrink-0 mt-0.5" /> 
                              <span className="line-clamp-2">{order.customerAddress || order.deliveryAddress || order.address || order.location || 'Address not provided'}</span>
                            </p>
                          )}
                        </>
                      ) : (
                        <div className="bg-gray-100 p-2 rounded text-center text-xs text-gray-500 font-medium">Customer details hidden</div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">Order Items</h4>
                      <ul className="space-y-1.5 bg-gray-50 p-2 rounded-lg border border-gray-100">
                        {order.items?.map((item: any, i: number) => (
                          <li key={i} className="text-sm flex justify-between">
                            <span className="text-gray-700"><span className="font-medium">{item.quantity || 1}x</span> {item.name || item.title || 'Item'}</span>
                            <span className="text-gray-500">${((Number(item.price) || Number(item.totalPrice) || 0) * (Number(item.quantity) || 1)).toLocaleString()}</span>
                          </li>
                        ))}
                      </ul>
                      {(order.specialInstructions || order.instructions) && (
                        <div className="mt-2 text-xs bg-yellow-50 text-yellow-800 p-2 rounded border border-yellow-200 font-medium">
                          Notes: {order.specialInstructions || order.instructions}
                        </div>
                      )}
                      <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
                         <span className="font-bold">Payment:</span>
                         <span className={(order.paymentStatus || order.payment_status)?.toLowerCase() === 'paid' ? 'text-green-600 font-bold' : 'text-orange-500 font-bold'}>
                           {(order.paymentMethod || order.paymentType || order.payment_method || order.payment_mode || 'CASH').toUpperCase()} - {(order.paymentStatus || order.payment_status || 'Pending').toUpperCase()}
                         </span>
                      </div>
                    </div>

                    {/* Standardize workflow flags */}
                    <div className="mb-4 space-y-1 text-sm bg-gray-50 p-2 rounded-lg border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Kitchen Workflow</h4>
                      {[
                        { flag: 'billPrinted', label: 'Bill Printed' },
                        { flag: 'foodPrepared', label: 'Food Prepared' },
                        { flag: 'readyForPickup', label: 'Bill Attached & Ready' }
                      ].map(item => (
                        <div key={item.flag} className="flex items-center gap-2 text-gray-700 cursor-pointer" onClick={() => toggleWorkflowFlag(order.id, item.flag, !order[item.flag])}>
                          {order[item.flag] ? <CheckSquare size={16} className="text-green-500" /> : <Square size={16} className="text-gray-300" />}
                          <span className={order[item.flag] ? 'font-medium text-gray-900 text-xs' : 'text-xs'}>{item.label}</span>
                        </div>
                      ))}
                    </div>

                    {(!order.orderType || order.orderType === 'delivery') && ['ready', 'packed', 'assigned', 'out_for_delivery'].includes(order.status) && hasActionPermission('Assign Rider') && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-bold text-gray-900 mb-2">Rider Assignment</h4>
                        <div className="flex gap-2">
                          <select 
                            value={order.riderId || ''} 
                            onChange={(e) => assignRider(order.id, e.target.value)}
                            className="bg-white flex-1 p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-bangalore-primary focus:ring-2 ring-bangalore-primary/20"
                          >
                            <option value="">Assign a Rider...</option>
                            {riders.map(p => (
                              <option key={p.id} value={p.id}>{p.name} - {p.status}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto custom-scrollbar">
                    {hasActionPermission('Update Order Status') ? (
                      <>
                        {order.status === 'pending' && (
                          <>
                            {hasStatusPermission('accepted') && <button onClick={() => updateOrderStatus(order.id, 'accepted')} className="flex-1 bg-bangalore-primary text-white py-2 px-3 rounded-lg text-sm font-bold hover:bg-bangalore-primary transition-colors whitespace-nowrap shadow-sm">Accept</button>}
                            {hasStatusPermission('cancelled') && <button onClick={() => updateOrderStatus(order.id, 'cancelled')} className="flex-1 bg-white border border-red-200 text-red-600 py-2 px-3 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors whitespace-nowrap shadow-sm">Reject</button>}
                          </>
                        )}
                        {order.status === 'accepted' && hasStatusPermission('preparing') && (
                          <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="w-full bg-orange-500 text-white py-2 px-3 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm">Start Preparing</button>
                        )}
                        {order.status === 'preparing' && hasStatusPermission('ready') && (
                          <button onClick={() => updateOrderStatus(order.id, 'ready')} className="w-full bg-indigo-500 text-white py-2 px-3 rounded-lg text-sm font-bold hover:bg-indigo-600 transition-colors shadow-sm">Mark Ready</button>
                        )}
                        {order.status === 'ready' && hasStatusPermission('packed') && (
                          <button onClick={() => updateOrderStatus(order.id, 'packed')} className="w-full bg-pink-500 text-white py-2 px-3 rounded-lg text-sm font-bold hover:bg-pink-600 transition-colors shadow-sm">Mark Packed</button>
                        )}
                        {order.status === 'packed' && (!order.orderType || order.orderType === 'delivery') && !order.riderId && hasActionPermission('Assign Rider') && (
                          <div className="w-full text-center py-2 text-sm font-bold text-orange-500 bg-orange-50 rounded-lg">
                            Assign a rider above
                          </div>
                        )}
                        {['packed', 'assigned'].includes(order.status) && (!order.orderType || order.orderType === 'delivery') && order.riderId && hasStatusPermission('out_for_delivery') && (
                          <button onClick={() => updateOrderStatus(order.id, 'out_for_delivery')} className="w-full bg-purple-500 text-white py-2 px-3 rounded-lg text-sm font-bold hover:bg-purple-600 transition-colors shadow-sm">Out for Delivery</button>
                        )}
                        {['ready', 'packed'].includes(order.status) && order.orderType !== 'delivery' && hasStatusPermission('delivered') && (
                          <button onClick={() => updateOrderStatus(order.id, 'delivered')} className="w-full bg-green-500 text-white py-2 px-3 rounded-lg text-sm font-bold hover:bg-green-600 transition-colors shadow-sm">Mark Completed</button>
                        )}
                        {order.status === 'out_for_delivery' && (
                          <>
                            {hasStatusPermission('delivered') && <button onClick={() => updateOrderStatus(order.id, 'delivered')} className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-sm font-bold hover:bg-green-600 transition-colors shadow-sm">Delivered</button>}
                            {hasStatusPermission('failed') && <button onClick={() => updateOrderStatus(order.id, 'failed')} className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors shadow-sm">Failed</button>}
                          </>
                        )}
                        {(['delivered', 'cancelled', 'failed'].includes(order.status)) && (
                          <div className="w-full text-center py-2 text-sm font-bold text-gray-400 bg-gray-100 rounded-lg">
                            Order Closed
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full text-center py-2 text-sm font-bold text-gray-500 bg-gray-100 rounded-lg">
                        View Only
                      </div>
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

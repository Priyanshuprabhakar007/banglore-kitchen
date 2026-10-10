import React, { useState, useEffect, useRef } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../lib/auth';
import { User, Package, MapPin, Clock } from 'lucide-react';

export function Account() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const previousOrders = useRef<any>({});

  useEffect(() => {
    if (!user) return;
    
    // Request notification permission if not already granted
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const q = query(collection(db, 'orders'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Determine if status changed
      ordersData.forEach((newOrder: any) => {
        const oldOrder = previousOrders.current[newOrder.id];
        if (oldOrder && oldOrder.status !== newOrder.status && newOrder.status !== 'pending') {
          // Status updated! Let's notify.
          const msg = getFriendlyStatus(newOrder.status);
          if ('Notification' in window && Notification.permission === 'granted') {
             new Notification("Order Update", { body: `Order #${newOrder.id.slice(-6).toUpperCase()}: ${msg}` });
          } else {
             alert(`Order Update: ${msg}`);
          }
        }
        previousOrders.current[newOrder.id] = newOrder;
      });

      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching orders:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const getFriendlyStatus = (status: string) => {
    switch(status) {
      case 'pending': return "Order received.";
      case 'accepted': return "Your order has been accepted.";
      case 'preparing': return "Your food is being prepared.";
      case 'ready': 
      case 'packed': return "Your order is ready and being packed.";
      case 'assigned': return "Your order is assigned to a rider.";
      case 'out_for_delivery': return "Your order is out for delivery.";
      case 'delivered': return "Order delivered successfully.";
      case 'cancelled': return "Your order has been cancelled.";
      case 'failed': return "Order failed.";
      default: return status.replace(/_/g, ' ');
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': 
      case 'failed': return 'bg-red-100 text-red-800';
      case 'out_for_delivery': return 'bg-purple-100 text-purple-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-bangalore-ivory py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 bg-bangalore-primary/10 rounded-full flex items-center justify-center text-bangalore-primary mb-4 overflow-hidden">
                  {user.photoURL ? <img src={user.photoURL} alt="Profile" referrerPolicy="no-referrer" /> : <User size={40} />}
                </div>
                <h2 className="font-bold text-xl text-gray-900">{user.displayName || 'Customer'}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
              
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-xl bg-bangalore-primary text-white font-medium flex items-center gap-3">
                  <Package size={18} /> My Orders
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-3">
                  <MapPin size={18} /> Saved Addresses
                </button>
                <button onClick={logout} className="w-full text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium mt-4">
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 shadow-sm min-h-[500px]">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Order History</h2>
              
              {loading ? (
                <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bangalore-primary"></div></div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Package size={48} className="mx-auto mb-4 opacity-20" />
                  <p>You haven't placed any orders yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow relative overflow-hidden">
                      {order.status === 'out_for_delivery' && (
                         <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm animate-pulse">
                            Rider is on the way!
                         </div>
                      )}
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4 border-b pb-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Order #{order.id.substring(0,8).toUpperCase()}</p>
                          <p className="text-sm font-medium flex items-center gap-2"><Clock size={14}/> {new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-bangalore-primary mb-1">${order.totalAmount}</p>
                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                            {order.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                         <p className="font-bold text-gray-700 flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-bangalore-primary shrink-0"></span> {getFriendlyStatus(order.status)}
                         </p>
                      </div>

                      <div className="space-y-2">
                        {order.items?.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-700"><span className="font-medium">{item.quantity}x</span> {item.name}</span>
                            <span className="text-gray-500">${item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

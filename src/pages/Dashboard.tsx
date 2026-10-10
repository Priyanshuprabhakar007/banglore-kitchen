import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, where, Timestamp } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const StatCard = ({ title, value, trend, isPositive, icon: Icon, delay, customContent }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-center">
      {customContent ? customContent : (
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
      )}
      <div className="p-3 bg-bangalore-ivory rounded-xl text-bangalore-primary shrink-0 flex items-center justify-center">
        <Icon size={24} className="overflow-visible" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className={`flex items-center font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
        {trend}
      </span>
      <span className="text-gray-400 ml-2">vs last week</span>
    </div>
  </motion.div>
);

export function Dashboard() {
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, todayRevenue: 0 });
  const [revenuePeriod, setRevenuePeriod] = useState<'today' | 'week' | 'month' | 'year'>('today');
  const [periodRevenue, setPeriodRevenue] = useState(0);

  useEffect(() => {
    // Recent orders listener (limit 10)
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(10));
    const unsubscribeRecent = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setRecentOrders(ordersData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'orders');
    });

    // Dynamic Stats listener based on period
    const now = new Date();
    let startDate = new Date();
    if (revenuePeriod === 'today') {
      startDate.setHours(0, 0, 0, 0);
    } else if (revenuePeriod === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (revenuePeriod === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (revenuePeriod === 'year') {
      startDate = new Date(now.getFullYear(), 0, 1);
    }
    
    const startOfPeriod = Timestamp.fromDate(startDate);
    const statsQuery = query(collection(db, 'orders'), where('createdAt', '>=', startOfPeriod));
    
    const unsubscribeStats = onSnapshot(statsQuery, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      const now = new Date();
      
      const filtered = orders.filter(order => {
        const orderDate = order.createdAt?.toDate ? order.createdAt.toDate() : new Date(order.createdAt);
        if (revenuePeriod === 'today') {
          return orderDate.toDateString() === now.toDateString();
        }
        if (revenuePeriod === 'week') {
          const weekAgo = new Date(now);
          weekAgo.setDate(now.getDate() - 7);
          return orderDate >= weekAgo;
        }
        if (revenuePeriod === 'month') {
          return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
        }
        if (revenuePeriod === 'year') {
          return orderDate.getFullYear() === now.getFullYear();
        }
        return false;
      });

      const totalRev = filtered.reduce((sum, o) => sum + (Number(o.totalAmount || o.total) || 0), 0);
      setPeriodRevenue(totalRev);

      // If period is today, update the global today stats card values too
      if (revenuePeriod === 'today') {
        const pendingCount = orders.filter(o => o.status === 'pending').length;
        setStats({
          totalOrders: snapshot.size,
          pendingOrders: pendingCount,
          todayRevenue: totalRev
        });
      } else {
        // Just update today stats by a separate check or keep them from previous today view
        // For simplicity and to respond to user's "calculate today live" in TASK 3, 
        // we'll keep today stats logic simple.
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'orders (stats)');
    });

    return () => {
      unsubscribeRecent();
      unsubscribeStats();
    };
  }, [revenuePeriod]);

  // Aggregated data for charts - using last 7 days of orders
  const revenueData = React.useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const data = days.map(day => ({ name: day, total: 0 }));
    
    // In a real app, this should be an aggregation query or separate stats collection
    recentOrders.forEach(order => {
      const d = order.createdAt?.toDate ? order.createdAt.toDate() : new Date();
      data[d.getDay()].total += (order.totalAmount || 0);
    });
    return data;
  }, [recentOrders]);

  const categoryData = React.useMemo(() => {
    const categories: Record<string, number> = {};
    recentOrders.forEach(order => {
      (order.items || []).forEach((item: any) => {
        const name = item.name || item.title || 'Other';
        categories[name] = (categories[name] || 0) + (item.quantity || 1);
      });
    });
    return Object.entries(categories)
      .map(([name, sales]) => ({ name, sales }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
  }, [recentOrders]);

  return (
    <div className="space-y-8 pb-8">
      <Helmet>
        <title>Dashboard | The Bangalore Kitchen Admin</title>
      </Helmet>
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-serif font-bold text-gray-900"
          >
            Welcome back, Admin
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 mt-1"
          >
            Here's what's happening at The Bangalore Kitchen today.
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">Accepting Orders</span>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={TrendingUp} 
          delay={0.1} 
          trend="-" 
          isPositive={true}
          customContent={
            <div className="flex flex-col gap-1">
              <select
                value={revenuePeriod}
                onChange={e => setRevenuePeriod(e.target.value as any)}
                className="text-sm font-medium text-gray-500 bg-transparent border-none outline-none cursor-pointer appearance-none pr-4"
              >
                <option value="today">Today's Revenue</option>
                <option value="week">This Week's Revenue</option>
                <option value="month">This Month's Revenue</option>
                <option value="year">This Year's Revenue</option>
              </select>
              <p className="text-3xl font-bold text-gray-900">${periodRevenue.toLocaleString('en-IN')}</p>
            </div>
          }
        />
        <StatCard title="Today's Orders" value={stats.totalOrders} trend="-" isPositive={true} icon={ShoppingBag} delay={0.2} />
        <StatCard title="Pending Orders" value={stats.pendingOrders} trend="-" isPositive={true} icon={Clock} delay={0.3} />
        <StatCard title="Active Customers" value="-" trend="-" isPositive={true} icon={Users} delay={0.4} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Revenue Overview</h3>
            <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-bangalore-primary focus:border-bangalore-primary block p-2">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 20, right: 20, left: 30, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#800000" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#800000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} width={45} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`$${value}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="total" stroke="#800000" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">Top Categories</h3>
          <div className="h-[300px] w-full mt-4 md:mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 13 }} width={100} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="sales" fill="#D4AF37" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Live Orders</h3>
          <button className="text-bangalore-primary text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Items</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order, index) => (
                <motion.tr 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                  key={order.id} 
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-medium text-gray-900">{order.id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 text-gray-700">{order.customerName || 'Guest'}</td>
                  <td className="p-4 text-gray-500 text-sm truncate max-w-[200px]">{order.items?.map((i: any) => i.name).join(', ') || ''}</td>
                  <td className="p-4 font-medium text-gray-900">${(order.totalAmount || 0).toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize
                      ${order.status === 'preparing' ? 'bg-orange-100 text-orange-800' : 
                        order.status === 'ready' ? 'bg-blue-100 text-blue-800' : 
                        order.status === 'out_for_delivery' ? 'bg-purple-100 text-purple-800' : 
                        'bg-green-100 text-green-800'}`}
                    >
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm flex items-center gap-1">
                    <Clock size={14} />
                    {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleTimeString() : 'N/A'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

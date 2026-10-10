import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Users, Mail, Phone, ShoppingBag, Star } from 'lucide-react';

export function CustomersManagement() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'users')), (snapshot) => {
      // Only show customers, not admins
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((user: any) => user.role === 'customer' || !user.role);
      setCustomers(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage customer profiles.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Contact</th>
              <th className="p-4 font-medium">Joined</th>
              <th className="p-4 font-medium">Loyalty Points</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading...</td></tr> : 
             customers.length === 0 ? <tr><td colSpan={5} className="p-8 text-center text-gray-500">No customers found.</td></tr> :
             customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-bangalore-primary/10 text-bangalore-primary flex items-center justify-center font-bold">
                      {customer.displayName ? customer.displayName.charAt(0).toUpperCase() : <Users size={18} />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{customer.displayName || 'Unknown User'}</p>
                      <p className="text-xs text-gray-500">ID: {customer.id.substring(0,8)}...</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm text-gray-600 flex items-center gap-1"><Mail size={12}/> {customer.email || 'N/A'}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1"><Phone size={12}/> {customer.phone || 'N/A'}</p>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                    <Star size={12} /> {customer.loyaltyPoints || 0} pts
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-bangalore-primary text-sm font-medium hover:underline">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

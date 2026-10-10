import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Star, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

export function ReviewsManagement() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'reviews'), orderBy('createdAt', 'desc')), (snapshot) => {
      setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, 'reviews', id), { status });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Reviews & Feedback</h1>
        <p className="text-gray-500 text-sm mt-1">Manage customer reviews and ratings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? <p>Loading...</p> : reviews.length === 0 ? <p className="text-gray-500">No reviews yet.</p> : reviews.map(review => (
          <div key={review.id} className="bg-white border rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-900">{review.customerName || 'Anonymous'}</h3>
                <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg flex gap-2 items-start">
              <MessageSquare size={16} className="text-gray-400 shrink-0 mt-0.5" />
              {review.comment || 'No comment provided.'}
            </p>
            <div className="flex justify-between items-center pt-3 border-t">
              <span className={`text-xs font-bold px-2 py-1 rounded ${review.status === 'published' ? 'bg-green-100 text-green-800' : review.status === 'hidden' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {review.status || 'PENDING'}
              </span>
              <div className="flex gap-2">
                {review.status !== 'published' && <button onClick={() => updateStatus(review.id, 'published')} className="text-green-600 hover:bg-green-50 p-1.5 rounded"><CheckCircle size={18}/></button>}
                {review.status !== 'hidden' && <button onClick={() => updateStatus(review.id, 'hidden')} className="text-red-600 hover:bg-red-50 p-1.5 rounded"><XCircle size={18}/></button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

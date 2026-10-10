import { db } from './firebase';
import { collection, query, where, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

/**
 * Gets all riders who have their status set to 'Online'
 */
export async function getAvailableRiders() {
  const ridersRef = collection(db, 'riders');
  const q = query(ridersRef, where('status', '==', 'Online'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Automatically assigns an available online rider to an order
 */
export async function autoAssignRider(orderId: string) {
  const riders = await getAvailableRiders();
  
  if (riders.length === 0) {
    throw new Error("No online riders available for assignment.");
  }
  
  // Pick the first available rider (could be improved with proximity or workload logic)
  const rider = riders[0] as any;
  
  const assignmentData = {
    status: 'assigned',
    riderId: rider.id,
    riderName: rider.name,
    assignedAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  
  await updateDoc(doc(db, 'orders', orderId), assignmentData);
  
  // Also update rider status so they aren't assigned multiple orders simultaneously if desired
  // User didn't explicitly ask for rider status update but it's standard.
  // We'll stick to the prompt's requirement for order update.
  
  return rider;
}

/**
 * Generic helper to update order status
 */
export async function updateOrderStatus(orderId: string, status: string, extraData = {}) {
  await updateDoc(doc(db, 'orders', orderId), {
    status,
    ...extraData,
    updatedAt: serverTimestamp()
  });
}

import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * Fetch all available dishes marked as Bestseller
 */
export async function fetchBestsellers() {
  try {
    const q = query(
      collection(db, 'menuItems'),
      where('isBestseller', '==', true),
      where('isAvailable', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching bestsellers:", error);
    return [];
  }
}

/**
 * Fetch all available dishes marked as Chef's Special
 */
export async function fetchChefsRecommendations() {
  try {
    const q = query(
      collection(db, 'menuItems'),
      where('isChefsSpecial', '==', true),
      where('isAvailable', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching chef recommendations:", error);
    return [];
  }
}

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function logActivity(
  userId: string,
  userName: string,
  roleName: string,
  action: string,
  section: string,
  oldValue?: string | null,
  newValue?: string | null
) {
  try {
    await addDoc(collection(db, 'activityLogs'), {
      userId,
      userName,
      roleName: roleName || 'Super Admin',
      action,
      section,
      oldValue: oldValue || null,
      newValue: newValue || null,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Failed to log activity', error);
  }
}

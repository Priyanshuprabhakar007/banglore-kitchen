import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Category {
  id: string;
  name: string;
  order?: number;
  isActive?: boolean;
}

export const DEFAULT_SHOWCASE_CATEGORIES: Category[] = [
  { id: 'all', name: 'All Items' },
  { id: 'south-indian', name: 'South Indian' },
  { id: 'indian-veg', name: 'Indian Veg' },
  { id: 'indian-non-veg', name: 'Indian Non-Veg' },
  { id: 'indo-chinese', name: 'Indo-Chinese' },
  { id: 'biryani', name: 'Biryani' },
  { id: 'desserts-beverages', name: 'Desserts & Beverages' },
  { id: 'bestseller', name: 'Bestsellers' },
  { id: 'chefs', name: "Chef's Specials" },
];

// Persistent client-side memory cache
let cachedMenuItems: any[] | null = null;
let cachedCategories: Category[] | null = null;
let isSubscribing = false;
let unsubscribeItems: (() => void) | null = null;
let unsubscribeCategories: (() => void) | null = null;

type ListenerCallback = (data: { items: any[]; categories: Category[]; isReady: boolean }) => void;
const subscribers = new Set<ListenerCallback>();

function formatCategories(rawDocs: any[]): Category[] {
  const catData = rawDocs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter((c: any) => c.isActive !== false);

  const showcaseCategories: Category[] = [
    { id: 'south-indian', name: 'South Indian' },
    { id: 'indian-veg', name: 'Indian Veg' },
    { id: 'indian-non-veg', name: 'Indian Non-Veg' },
    { id: 'indo-chinese', name: 'Indo-Chinese' },
    { id: 'biryani', name: 'Biryani' },
    { id: 'desserts-beverages', name: 'Desserts & Beverages' },
  ];

  return [
    { id: 'all', name: 'All Items' },
    ...showcaseCategories,
    { id: 'bestseller', name: 'Bestsellers' },
    { id: 'chefs', name: "Chef's Specials" },
    ...catData.filter((c: any) => !['biryani', 'dessert', 'beverages', 'south-indian'].includes(c.id)),
  ];
}

function notifySubscribers() {
  const data = {
    items: cachedMenuItems || [],
    categories: cachedCategories || DEFAULT_SHOWCASE_CATEGORIES,
    isReady: cachedMenuItems !== null,
  };
  subscribers.forEach(cb => {
    try {
      cb(data);
    } catch (err) {
      console.error('Menu subscriber error:', err);
    }
  });
}

function startSubscription() {
  if (isSubscribing) return;
  isSubscribing = true;

  try {
    const qItems = query(collection(db, 'menuItems'), where('isAvailable', '==', true));
    unsubscribeItems = onSnapshot(
      qItems,
      snapshot => {
        cachedMenuItems = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        notifySubscribers();
      },
      error => {
        console.error('Firestore menu items subscription error:', error);
      }
    );

    const qCats = query(collection(db, 'categories'), orderBy('order', 'asc'));
    unsubscribeCategories = onSnapshot(
      qCats,
      snapshot => {
        cachedCategories = formatCategories(snapshot.docs);
        notifySubscribers();
      },
      error => {
        console.error('Firestore categories subscription error:', error);
      }
    );
  } catch (err) {
    console.error('Error starting menu data subscription:', err);
    isSubscribing = false;
  }
}

/**
 * Preload menu data in the background (during browser idle or navbar hover)
 */
export function preloadMenuData() {
  if (!isSubscribing) {
    startSubscription();
  }
}

/**
 * Synchronous snapshot of currently cached menu data
 */
export function getMenuSnapshot(): { items: any[]; categories: Category[]; isReady: boolean } {
  return {
    items: cachedMenuItems || [],
    categories: cachedCategories || DEFAULT_SHOWCASE_CATEGORIES,
    isReady: cachedMenuItems !== null,
  };
}

/**
 * Subscribe to real-time menu data with immediate cached delivery
 */
export function subscribeMenuData(callback: ListenerCallback): () => void {
  subscribers.add(callback);

  // Immediately provide cached data if available
  callback({
    items: cachedMenuItems || [],
    categories: cachedCategories || DEFAULT_SHOWCASE_CATEGORIES,
    isReady: cachedMenuItems !== null,
  });

  // Ensure underlying subscription is running
  if (!isSubscribing) {
    startSubscription();
  }

  return () => {
    subscribers.delete(callback);
  };
}

import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

const IMAGE_MAP = {
  // Breads
  'naan': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800',
  'roti': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800',
  'paratha': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800',
  'chapati': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800',

  // Chicken
  'chicken biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800',
  'butter chicken': 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800',
  'chicken tikka masala': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800',
  'tandoori chicken': 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=800',
  'chilli chicken': 'https://images.unsplash.com/photo-1599487405270-82759ae80611?auto=format&fit=crop&q=80&w=800',
  'chicken 65': 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=800',
  'chicken momos': 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=800',
  'chicken curry': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800',

  // Paneer
  'paneer butter masala': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800',
  'saag paneer': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
  'chilli paneer': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800',
  'paneer tikka': 'https://images.unsplash.com/photo-1599487405270-82759ae80611?auto=format&fit=crop&q=80&w=800',

  // Mutton/Goat/Fish
  'goat paya soup': 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800',
  'mutton': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800',
  'goat': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800',
  'fish': 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800',
  'prawn': 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&q=80&w=800',
  
  // Dosa
  'dosa': 'https://images.unsplash.com/photo-1589301760014-d929f39ce9de?auto=format&fit=crop&q=80&w=800',
  'uttapam': 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=800',
  'idli': 'https://images.unsplash.com/photo-1589301760014-d929f39ce9de?auto=format&fit=crop&q=80&w=800',
  'vada': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
  'mini tiffin': 'https://images.unsplash.com/photo-1589301760014-d929f39ce9de?auto=format&fit=crop&q=80&w=800',

  // Indo Chinese & Rice
  'fried rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800',
  'noodles': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800',
  'jeera rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800',
  'rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800',
  
  // Soups
  'soup': 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800',

  // Desserts
  'ice cream': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=800',
  'jamun': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
  'dessert': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
  'halwa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',

  // Beverages
  'coffee': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
  'chai': 'https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?auto=format&fit=crop&q=80&w=800',
  'tea': 'https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?auto=format&fit=crop&q=80&w=800',
  'lassi': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800',
  'milk': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800',
  'beverage': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=800',

  // Default Fallbacks by Category
  'veg-appetizers': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800', // Samosa/Pakoda
  'non-veg-appetizers': 'https://images.unsplash.com/photo-1599487405270-82759ae80611?auto=format&fit=crop&q=80&w=800',
  'main-course-veg': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800',
  'main-course-non-veg': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800',
  'indo-chinese-veg-gravy': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800',
  'biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800'
};

function getImage(name, categoryId) {
  const n = name.toLowerCase();
  
  // Exact or close match
  for (const [key, url] of Object.entries(IMAGE_MAP)) {
    if (n.includes(key)) {
      return url;
    }
  }
  
  // Category fallback
  if (IMAGE_MAP[categoryId]) {
    return IMAGE_MAP[categoryId];
  }
  
  return '';
}

async function run() {
  const menuSnapshot = await getDocs(collection(db, 'menuItems'));
  let updated = 0;
  
  for (const docSnapshot of menuSnapshot.docs) {
    const data = docSnapshot.data();
    
    // Always assign a fresh accurate image, unless it's an admin-uploaded file (like from firebase storage)
    // Actually, in this case, all current URLs are unsplash or empty, so we can overwrite them.
    if (!data.imageUrl || data.imageUrl.includes('unsplash')) {
      const newUrl = getImage(data.name, data.categoryId);
      if (newUrl) {
        await updateDoc(doc(db, 'menuItems', docSnapshot.id), { imageUrl: newUrl });
        updated++;
      }
    }
  }
  
  console.log(`Updated images for ${updated} items.`);
  process.exit(0);
}

run().catch(console.error);

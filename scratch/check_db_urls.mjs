import fs from 'fs';

const items = JSON.parse(fs.readFileSync('scratch/firebase_menu_items.json', 'utf8'));

// Check what items have unique, good images in Firestore
console.log('Total items in DB:', items.length);

// Let us find items with interesting image URLs
items.slice(0, 20).forEach(it => {
  console.log(`[${it.name}] -> ${it.imageUrl}`);
});

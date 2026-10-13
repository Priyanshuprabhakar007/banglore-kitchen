import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

async function fetchAll() {
  const itemsSnapshot = await getDocs(collection(db, 'menuItems'));
  console.log(`Total menuItems in Firestore: ${itemsSnapshot.docs.length}`);
  
  const items = itemsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  // Sort items by categoryId, then name
  items.sort((a, b) => {
    if (a.categoryId !== b.categoryId) {
      return (a.categoryId || '').localeCompare(b.categoryId || '');
    }
    return (a.name || '').localeCompare(b.name || '');
  });

  fs.writeFileSync('./scratch/firebase_menu_items.json', JSON.stringify(items, null, 2), 'utf-8');
  console.log('Saved to ./scratch/firebase_menu_items.json');
  process.exit(0);
}

fetchAll().catch(err => {
  console.error("Error fetching items:", err);
  process.exit(1);
});

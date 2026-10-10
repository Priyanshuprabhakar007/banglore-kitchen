import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

async function check() {
  const itemsSnapshot = await getDocs(collection(db, 'menuItems'));
  
  const categories = {};
  itemsSnapshot.docs.forEach(doc => {
    const data = doc.data();
    categories[data.categoryId] = (categories[data.categoryId] || 0) + 1;
  });
  
  console.log("Item counts by categoryId:");
  console.log(categories);
  process.exit(0);
}
check();

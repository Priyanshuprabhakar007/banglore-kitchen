import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

async function check() {
  const itemsSnapshot = await getDocs(collection(db, 'menuItems'));
  
  let availableCount = 0;
  let totalCount = 0;
  itemsSnapshot.docs.forEach(doc => {
    totalCount++;
    if (doc.data().isAvailable) {
      availableCount++;
    }
  });
  
  console.log(`Total items: ${totalCount}, Available: ${availableCount}`);
  process.exit(0);
}
check();

import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs, query, where } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

async function check() {
  const qItems = query(collection(db, 'menuItems'), where('categoryId', '==', 'breads'));
  const itemsSnapshot = await getDocs(qItems);
  itemsSnapshot.docs.forEach(d => console.log(d.id, d.data().name, d.data().imageUrl));
  process.exit(0);
}
check();

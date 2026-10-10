import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

async function check() {
  const categoriesSnapshot = await getDocs(collection(db, 'categories'));
  categoriesSnapshot.docs.forEach(doc => console.log(doc.id, doc.data()));
  process.exit(0);
}
check();

import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

async function run() {
  const snapshot = await getDocs(collection(db, 'menuItems'));
  let missing = [];
  snapshot.docs.forEach(doc => {
    const data = doc.data();
    if (!data.imageUrl || data.imageUrl === '') {
      missing.push({ id: doc.id, name: data.name, categoryId: data.categoryId });
    }
  });
  console.log("Missing images count:", missing.length);
  console.log(missing);
  process.exit(0);
}
run();

import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

async function run() {
  const menuSnapshot = await getDocs(collection(db, 'menuItems'));
  const counts = {};
  menuSnapshot.docs.forEach(d => {
    const url = d.data().imageUrl;
    if (url) {
      counts[url] = (counts[url] || 0) + 1;
    }
  });
  console.log("Image usage counts:", counts);
  process.exit(0);
}
run();

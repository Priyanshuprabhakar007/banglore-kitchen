import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, doc, setDoc } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

async function run() {
  try {
    await setDoc(doc(db, 'menuItems', 'test-item-123'), { name: 'test' });
    console.log("Write success!");
  } catch(e) {
    console.error(e.message);
  }
  process.exit(0);
}
run();

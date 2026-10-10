import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

async function run() {
  const snapshot = await getDocs(collection(db, 'menuItems'));
  for (const d of snapshot.docs) {
    const item = d.data();
    if (item.name === 'Chicken Lollipop' || item.name.includes('7 Family')) {
        console.log(item.name, "=>", item.imageUrl);
        await updateDoc(doc(db, 'menuItems', d.id), {
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Chicken_curry.jpg",
          imageSource: 'family_fallback',
          imageNeedsReview: false
        });
    }
  }
  process.exit(0);
}
run();

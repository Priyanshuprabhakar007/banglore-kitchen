import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs } from "firebase/firestore";
import https from 'https';

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

function checkUrl(url) {
  return new Promise(resolve => {
    https.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => resolve('Error: ' + e.message));
  });
}

async function run() {
  const snapshot = await getDocs(collection(db, 'menuItems'));
  
  let checked = new Set();
  
  for(const doc of snapshot.docs) {
    const data = doc.data();
    if(data.imageUrl && !checked.has(data.imageUrl)) {
      checked.add(data.imageUrl);
      const status = await checkUrl(data.imageUrl);
      if(status !== 200) {
        console.log(`[${status}] ${data.name}: ${data.imageUrl}`);
      }
    }
  }
  process.exit(0);
}
run();

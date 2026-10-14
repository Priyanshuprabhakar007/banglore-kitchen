import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, doc, updateDoc, serverTimestamp } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

async function applySync() {
  const report = JSON.parse(fs.readFileSync('./scratch/firestore_dry_run_report.json', 'utf-8'));
  const updates = report.proposedUpdates;

  console.log(`Starting Firestore imageUrl synchronization for ${updates.length} items...`);

  let count = 0;
  for (const item of updates) {
    const docRef = doc(db, 'menuItems', item.dishId);
    await updateDoc(docRef, {
      imageUrl: item.proposedImageUrl,
      updatedAt: serverTimestamp()
    });
    count++;
    console.log(`[${count}/${updates.length}] Updated ${item.dishName} (${item.dishId}) -> ${item.proposedImageUrl}`);
  }

  console.log(`Successfully updated ${count} dishes in Firestore.`);
  process.exit(0);
}

applySync().catch(err => {
  console.error("Error applying updates to Firestore:", err);
  process.exit(1);
});

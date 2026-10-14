import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, doc, writeBatch, serverTimestamp } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

const dryRun = JSON.parse(fs.readFileSync("./scratch/proposed_firebase_updates.json", "utf-8"));
const updates = dryRun.proposedUpdates;

console.log(`Starting Firestore synchronization for ${updates.length} approved documents...`);

async function syncToFirestore() {
  const batch = writeBatch(db);
  
  for (const item of updates) {
    const docRef = doc(db, 'menuItems', item.dishId);
    batch.update(docRef, {
      imageUrl: item.proposedImageUrl,
      imageSource: 'local_ai_verified',
      imageNeedsReview: false,
      updatedAt: serverTimestamp()
    });
  }

  await batch.commit();
  console.log(`Successfully updated ${updates.length} menuItems in live Firestore!`);
  process.exit(0);
}

syncToFirestore().catch(err => {
  console.error("Firestore sync failed:", err);
  process.exit(1);
});

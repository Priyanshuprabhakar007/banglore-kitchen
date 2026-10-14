import fs from 'fs';
import path from 'path';
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs, writeBatch, doc } from "firebase/firestore";

// Read Firebase config
const configPath = path.resolve("./firebase-applet-config.json");
if (!fs.existsSync(configPath)) {
  console.error("firebase-applet-config.json not found!");
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

// Load AI Manifest
const manifestPath = path.resolve("./src/data/aiMenuManifest.json");
if (!fs.existsSync(manifestPath)) {
  console.error("aiMenuManifest.json not found!");
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
const manifestMap = new Map(manifest.map(m => [m.dishId, m]));

const args = process.argv.slice(2);
const isApply = args.includes("--apply");
const isRollback = args.includes("--rollback");

async function main() {
  console.log("==================================================================");
  console.log("THE BANGALORE KITCHEN — FIREBASE MENU IMAGE SYNCHRONIZATION TOOL");
  console.log("==================================================================");
  console.log(`Mode: ${isRollback ? "ROLLBACK" : isApply ? "APPLY BULK WRITE" : "DRY RUN PREVIEW"}`);
  console.log("");

  const snapshot = await getDocs(collection(db, 'menuItems'));
  console.log(`Retrieved ${snapshot.docs.length} items from Firestore.`);

  // Create backups directory
  const backupDir = path.resolve("./backups");
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Backup current state
  const currentState = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  const backupFile = path.join(backupDir, `menuItems_backup_${Date.now()}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(currentState, null, 2), "utf-8");
  console.log(`[BACKUP] Saved snapshot of current Firestore state to: ${backupFile}`);

  if (isRollback) {
    console.log("\nStarting Rollback...");
    const batch = writeBatch(db);
    let rollbackCount = 0;
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      if (data.originalImageUrlBackup) {
        batch.update(docSnap.ref, {
          imageUrl: data.originalImageUrlBackup,
          updatedAt: new Date().toISOString()
        });
        rollbackCount++;
      }
    }
    if (rollbackCount > 0) {
      await batch.commit();
      console.log(`[ROLLBACK SUCCESS] Rolled back ${rollbackCount} dishes to originalImageUrlBackup.`);
    } else {
      console.log("[ROLLBACK] No originalImageUrlBackup fields found to restore.");
    }
    process.exit(0);
  }

  // Preview changes
  const toUpdateAi = [];
  const toClearUnsplash = [];
  const unchanged = [];

  for (const docSnap of snapshot.docs) {
    const dish = { id: docSnap.id, ...docSnap.data() };
    const m = manifestMap.get(dish.id);

    if (m && m.generationStatus === 'GENERATED' && m.assetPath) {
      // Dish has verified AI image
      toUpdateAi.push({
        id: dish.id,
        name: dish.name,
        currentUrl: dish.imageUrl,
        newUrl: m.assetPath + '?v=ai-1',
        ref: docSnap.ref
      });
    } else if (dish.imageUrl && dish.imageUrl.includes('images.unsplash.com')) {
      // Dish has legacy Unsplash URL without AI image yet
      toClearUnsplash.push({
        id: dish.id,
        name: dish.name,
        currentUrl: dish.imageUrl,
        newUrl: '', // clear so customer site only uses neutral placeholder
        ref: docSnap.ref
      });
    } else {
      unchanged.push({
        id: dish.id,
        name: dish.name,
        currentUrl: dish.imageUrl
      });
    }
  }

  console.log("\n--- PREVIEW SUMMARY ---");
  console.log(`1. Approved AI Images to write:      ${toUpdateAi.length}`);
  console.log(`2. Unsplash URLs to clear (pending): ${toClearUnsplash.length}`);
  console.log(`3. Dishes unchanged:                  ${unchanged.length}`);
  console.log(`Total dishes examined:                ${snapshot.docs.length}`);

  console.log("\n[SAMPLE UPDATES - APPROVED AI DISHES]:");
  toUpdateAi.slice(0, 10).forEach(u => {
    console.log(`  - [${u.id}] ${u.name} -> ${u.newUrl}`);
  });
  if (toUpdateAi.length > 10) {
    console.log(`    ... and ${toUpdateAi.length - 10} more approved AI dishes.`);
  }

  if (!isApply) {
    console.log("\n[DRY RUN COMPLETE] Zero writes were made to production Firestore.");
    console.log("To apply these changes, run this script with --apply:");
    console.log("  node ./scripts/sync_firebase_ai_images.mjs --apply\n");
    process.exit(0);
  }

  // Execute bulk write
  console.log("\n[APPLYING BULK WRITE TO FIRESTORE]...");
  const batch = writeBatch(db);

  for (const u of toUpdateAi) {
    batch.update(u.ref, {
      imageUrl: u.newUrl,
      originalImageUrlBackup: u.currentUrl || '',
      imageSource: 'ai_generated',
      imageNeedsReview: false,
      updatedAt: new Date().toISOString()
    });
  }

  for (const c of toClearUnsplash) {
    batch.update(c.ref, {
      imageUrl: '',
      originalImageUrlBackup: c.currentUrl || '',
      imageSource: 'pending_ai_generation',
      imageNeedsReview: false,
      updatedAt: new Date().toISOString()
    });
  }

  await batch.commit();
  console.log(`[SUCCESS] Successfully updated ${toUpdateAi.length + toClearUnsplash.length} dishes in Firestore!`);
  console.log("[SAFETY] All previous URLs are preserved in `originalImageUrlBackup` on each document and in backups folder.");
  process.exit(0);
}

main().catch(err => {
  console.error("Migration error:", err);
  process.exit(1);
});

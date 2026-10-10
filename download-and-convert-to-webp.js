import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import sharp from "sharp";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const auth = getAuth(app);
const db = initializeFirestore(app, {}, config.firestoreDatabaseId || "(default)");

const OUTPUT_DIR = path.join(process.cwd(), "public", "images", "dishes");

function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function fetchWithRetry(url, retries = 3, delayMs = 1500) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (res.status === 429) {
        console.log(`Rate limited on ${url}, waiting...`);
        await new Promise(r => setTimeout(r, delayMs * (i + 1)));
        continue;
      }
      if (!res.ok) throw new Error(`Status ${res.status}`);
      return await res.arrayBuffer();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, delayMs * (i + 1)));
    }
  }
}

async function downloadAndConvert(url, baseName) {
  const buffer = await fetchWithRetry(url);
  
  const widths = [480, 800, 1200];
  
  for (const w of widths) {
    const filename = `${baseName}-${w}.webp`;
    const outputPath = path.join(OUTPUT_DIR, filename);
    await sharp(Buffer.from(buffer))
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);
  }
    
  return `/images/dishes/${baseName}-1200.webp`;
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log("Signing in as admin...");
  await signInWithEmailAndPassword(auth, "admin@gmail.com", "admin123");
  console.log("Signed in!");

  const snapshot = await getDocs(collection(db, "menuItems"));
  const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  
  console.log(`Processing ${items.length} items...`);
  
  let successCount = 0;
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    let url = item.imageUrl;
    
    // Skip if already a local webp
    if (url && url.startsWith("/images/dishes/") && url.endsWith("-1200.webp")) {
      console.log(`[${i+1}/${items.length}] Skipping ${item.name} - already local webp: ${url}`);
      successCount++;
      continue;
    }
    
    // If it was processed by previous interrupted script, it might end with .webp but not -1200.webp
    if (url && url.startsWith("/images/dishes/") && url.endsWith(".webp") && !url.endsWith("-1200.webp")) {
       // We still need the original URL to fetch and create variants. Let's look for original url in history, or just fetch the current local webp and resize it?
       // Let's just resize the existing local .webp which we saved!
       const localPath = path.join(process.cwd(), "public", url);
       if (fs.existsSync(localPath)) {
         try {
           const buffer = fs.readFileSync(localPath);
           let baseName = sanitizeFilename(item.name);
           const widths = [480, 800, 1200];
           for (const w of widths) {
             const filename = `${baseName}-${w}.webp`;
             const outputPath = path.join(OUTPUT_DIR, filename);
             await sharp(buffer)
               .resize({ width: w, withoutEnlargement: true })
               .webp({ quality: 80 })
               .toFile(outputPath);
           }
           url = `/images/dishes/${baseName}-1200.webp`;
           await updateDoc(doc(db, "menuItems", item.id), {
             imageUrl: url,
             updatedAt: new Date().toISOString()
           });
           console.log(`[${i+1}/${items.length}] Upgraded local webp for "${item.name}" to responsive variants`);
           successCount++;
           continue;
         } catch (e) {
           console.error(`Failed to resize local image for ${item.name}: ${e.message}`);
         }
       }
    }
    
    if (!url || !url.startsWith("http")) {
      console.log(`[${i+1}/${items.length}] Skipping ${item.name} - invalid URL: ${url}`);
      continue;
    }
    
    let baseName = sanitizeFilename(item.name);
    
    try {
      console.log(`[${i+1}/${items.length}] Downloading and converting for "${item.name}"...`);
      const localPath = await downloadAndConvert(url, baseName);
      
      await updateDoc(doc(db, "menuItems", item.id), {
        imageUrl: localPath,
        updatedAt: new Date().toISOString()
      });
      
      console.log(`  -> Saved to ${localPath}`);
      successCount++;
      // Wait a bit to avoid rate limits
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.error(`  -> Failed for "${item.name}":`, e.message);
    }
  }
  
  console.log(`Finished processing. Successfully converted and updated ${successCount}/${items.length} items.`);
  process.exit(0);
}

main().catch(e => {
  console.error("Fatal:", e);
  process.exit(1);
});

import fs from "fs";
import fetch from "node-fetch";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const auth = getAuth(app);
const db = initializeFirestore(app, {}, config.firestoreDatabaseId || "(default)");

// Unsplash curated fallback list of verified high quality food image URLs for various Indian & Asian dishes
const UNSPLASH_FOOD_MAP = {
  "biryani": [
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80"
  ],
  "dosa": [
    "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&auto=format&fit=crop&q=80"
  ],
  "paneer": [
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80"
  ],
  "chicken": [
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1610057099443-f63a1188d79f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80"
  ],
  "rice": [
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
  ],
  "naan": [
    "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80"
  ],
  "soup": [
    "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1603105037880-880cd4edfb5d?w=800&auto=format&fit=crop&q=80"
  ],
  "dessert": [
    "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
  ],
  "beverages": [
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&auto=format&fit=crop&q=80"
  ]
};

async function checkUrlValid(url) {
  if (!url || typeof url !== "string") return false;
  if (!url.startsWith("http://") && !url.startsWith("https://")) return false;
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, { method: "HEAD", signal: controller.signal, headers: { "User-Agent": "Mozilla/5.0" } });
    clearTimeout(id);
    if (res.ok) {
      const type = res.headers.get("content-type") || "";
      if (type.includes("image") || url.includes("upload.wikimedia.org") || url.includes("images.unsplash.com")) {
        return true;
      }
    }
  } catch (e) {
    // If HEAD fails, try GET with range header
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(url, { method: "GET", headers: { Range: "bytes=0-100", "User-Agent": "Mozilla/5.0" }, signal: controller.signal });
      clearTimeout(id);
      if (res.ok || res.status === 206) return true;
    } catch (e2) {}
  }
  return false;
}

async function searchWikimedia(query) {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|mime|size&format=json`;
    const res = await fetch(url, { headers: { "User-Agent": "BangaloreKitchenApp/1.0" } });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.query || !data.query.pages) return [];
    const pages = Object.values(data.query.pages);
    const results = [];
    for (const page of pages) {
      if (page.imageinfo && page.imageinfo[0]) {
        const info = page.imageinfo[0];
        const imgUrl = info.url;
        if (imgUrl && (imgUrl.endsWith(".jpg") || imgUrl.endsWith(".jpeg") || imgUrl.endsWith(".png") || imgUrl.endsWith(".webp"))) {
          // Clean commons URL
          const cleanUrl = imgUrl.split("?")[0];
          results.push(cleanUrl);
        }
      }
    }
    return results;
  } catch (e) {
    return [];
  }
}

async function searchWikipediaArticleImage(term) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;
    const res = await fetch(url, { headers: { "User-Agent": "BangaloreKitchenApp/1.0" } });
    if (res.ok) {
      const data = await res.json();
      if (data.originalimage && data.originalimage.source) {
        return data.originalimage.source;
      }
      if (data.thumbnail && data.thumbnail.source) {
        return data.thumbnail.source;
      }
    }
  } catch (e) {}
  return null;
}

async function main() {
  console.log("Signing in as admin...");
  await signInWithEmailAndPassword(auth, "admin@gmail.com", "admin123");
  console.log("Signed in successfully!");

  const snapshot = await getDocs(collection(db, "menuItems"));
  const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  console.log(`Fetched ${items.length} menu items from Firestore.`);

  const usedUrls = new Set();
  const itemUpdates = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const rawName = item.name || "";
    // Clean name for searching
    let cleanName = rawName
      .replace(/\(.*?\)/g, "")
      .replace(/\[.*?\]/g, "")
      .replace(/ - .*/g, "")
      .trim();

    console.log(`\n[${i + 1}/${items.length}] Searching unique image for: "${rawName}" (clean: "${cleanName}", category: ${item.categoryId})`);

    let assignedUrl = null;

    // Search Strategy 1: Wikipedia Page Article Image
    const wikiPageImg = await searchWikipediaArticleImage(cleanName);
    if (wikiPageImg && !usedUrls.has(wikiPageImg) && await checkUrlValid(wikiPageImg)) {
      assignedUrl = wikiPageImg;
      console.log(`  -> Found via Wikipedia Article Image: ${assignedUrl}`);
    }

    // Search Strategy 2: Wikimedia Commons Search with cleanName + " food"
    if (!assignedUrl) {
      const candidates = await searchWikimedia(`${cleanName} food`);
      for (const cand of candidates) {
        if (!usedUrls.has(cand) && await checkUrlValid(cand)) {
          assignedUrl = cand;
          console.log(`  -> Found via Wikimedia Search ("${cleanName} food"): ${assignedUrl}`);
          break;
        }
      }
    }

    // Search Strategy 3: Wikimedia Commons Search with rawName
    if (!assignedUrl && rawName !== cleanName) {
      const candidates = await searchWikimedia(rawName);
      for (const cand of candidates) {
        if (!usedUrls.has(cand) && await checkUrlValid(cand)) {
          assignedUrl = cand;
          console.log(`  -> Found via Wikimedia Search ("${rawName}"): ${assignedUrl}`);
          break;
        }
      }
    }

    // Search Strategy 4: Wikimedia Commons Search with cleanName Indian dish
    if (!assignedUrl) {
      const candidates = await searchWikimedia(`${cleanName} Indian dish`);
      for (const cand of candidates) {
        if (!usedUrls.has(cand) && await checkUrlValid(cand)) {
          assignedUrl = cand;
          console.log(`  -> Found via Wikimedia Search ("${cleanName} Indian dish"): ${assignedUrl}`);
          break;
        }
      }
    }

    // Search Strategy 5: Existing URL if valid and not used
    if (!assignedUrl && item.imageUrl && !usedUrls.has(item.imageUrl) && await checkUrlValid(item.imageUrl)) {
      assignedUrl = item.imageUrl;
      console.log(`  -> Kept existing valid unique URL: ${assignedUrl}`);
    }

    // Search Strategy 6: Category/Keyword Unsplash Fallback
    if (!assignedUrl) {
      const nameLower = rawName.toLowerCase();
      let fallbackCat = "biryani";
      if (nameLower.includes("dosa") || nameLower.includes("tiffin") || nameLower.includes("uttapam") || nameLower.includes("idli")) fallbackCat = "dosa";
      else if (nameLower.includes("paneer") || nameLower.includes("gobi") || nameLower.includes("veg")) fallbackCat = "paneer";
      else if (nameLower.includes("chicken") || nameLower.includes("mutton") || nameLower.includes("lamb") || nameLower.includes("goat") || nameLower.includes("fish")) fallbackCat = "chicken";
      else if (nameLower.includes("rice") || nameLower.includes("pulao")) fallbackCat = "rice";
      else if (nameLower.includes("naan") || nameLower.includes("paratha") || nameLower.includes("roti") || nameLower.includes("bread")) fallbackCat = "naan";
      else if (nameLower.includes("soup") || nameLower.includes("rasam")) fallbackCat = "soup";
      else if (nameLower.includes("dessert") || nameLower.includes("jamun") || nameLower.includes("halwa") || nameLower.includes("ice cream")) fallbackCat = "dessert";
      else if (nameLower.includes("tea") || nameLower.includes("coffee") || nameLower.includes("milk") || nameLower.includes("lassi") || nameLower.includes("buttermilk") || nameLower.includes("beverage")) fallbackCat = "beverages";

      const list = UNSPLASH_FOOD_MAP[fallbackCat] || UNSPLASH_FOOD_MAP["biryani"];
      for (const cand of list) {
        if (!usedUrls.has(cand)) {
          assignedUrl = cand;
          console.log(`  -> Assigned Unsplash fallback (${fallbackCat}): ${assignedUrl}`);
          break;
        }
      }
    }

    if (!assignedUrl) {
      // Dynamic Unsplash source with unique seed parameter
      assignedUrl = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80&sig=${i + 1}`;
      console.log(`  -> Assigned unique sig image: ${assignedUrl}`);
    }

    usedUrls.add(assignedUrl);
    itemUpdates.push({ id: item.id, name: item.name, categoryId: item.categoryId, imageUrl: assignedUrl });
  }

  console.log(`\nAll ${itemUpdates.length} items have unique URLs assigned.`);
  console.log("Updating Firestore menuItems collection...");

  let updatedCount = 0;
  for (const update of itemUpdates) {
    try {
      await updateDoc(doc(db, "menuItems", update.id), {
        imageUrl: update.imageUrl,
        updatedAt: new Date().toISOString()
      });
      updatedCount++;
    } catch (err) {
      console.error(`Failed to update item ${update.id} (${update.name}):`, err.message);
    }
  }

  console.log(`Successfully updated ${updatedCount}/${itemUpdates.length} items in Firestore!`);
  fs.writeFileSync("./assigned-unique-images.json", JSON.stringify(itemUpdates, null, 2));
  console.log("Saved full record to assigned-unique-images.json");
  process.exit(0);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});

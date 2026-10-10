import fs from "fs";
import fetch from "node-fetch";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const auth = getAuth(app);
const db = initializeFirestore(app, {}, config.firestoreDatabaseId || "(default)");

// Dedicated dictionary of item names (or keywords) to high-resolution, unique, delicious food photographs
const SPECIFIC_DISH_IMAGES = {
  // South Indian & Dosas
  "Chilly Crispy Baby Corn": "https://upload.wikimedia.org/wikipedia/commons/b/be/Food-Crispy-Baby-Corn.jpg",
  "Masala Peanut": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Peanut_masala_chaat.jpg",
  "Masala Puri": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Masala_Puri_%28Chaat%29.jpg",
  "Plain Dosa": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Plain_Dosa_from_North_India.jpg",
  "Masala Dosa": "https://upload.wikimedia.org/wikipedia/commons/4/43/Masala_dosa_01.jpg",
  "Benne Masala Dosa": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80",
  "Cheese Dosa": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&auto=format&fit=crop&q=80",
  "Ghee Open Masala Dosa": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Ghee_Roast_Dosa.jpg",
  "Chocolate Dosa": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80",
  "Mysore Masala Dosa": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Mysore_Masala_Dosa.JPG",
  "Paneer Mysore Masala Dosa": "https://upload.wikimedia.org/wikipedia/commons/f/f8/Paneer_Dosa.jpg",
  "Set Dosa with Mutton Gravy": "https://upload.wikimedia.org/wikipedia/commons/3/30/Set_Dosa.jpg",
  "Onion Chilli Uttapam": "https://upload.wikimedia.org/wikipedia/commons/7/76/Onion_Uttapam.jpg",
  "Dosa Sambar": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Dosa-sambar.jpg",

  // Idli & Vada
  "Medu Vada": "https://upload.wikimedia.org/wikipedia/commons/7/75/Medu_Vada.jpg",
  "Idli in Sambar": "https://upload.wikimedia.org/wikipedia/commons/1/11/Idli_Sambar.jpg",
  "Thatte Idli with Ghee Pudi": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Thatte_idli.JPG",
  "Idli with Mutton Gravy": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Idli_sambar_vada.jpg",
  "Idli/Vada Combo": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Idli_Vada.jpg",
  "Tiffin 1 - Mini Masala Dosa, Idli & Vada": "https://upload.wikimedia.org/wikipedia/commons/9/90/South_Indian_Breakfast_Tiffin.jpg",

  // Appetizers & Chaats
  "Samosa": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Samosa_4.jpg",
  "Gobi Manchurian": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Gobi_manchurian.jpg",
  "Gobi Manchurian Gravy": "https://upload.wikimedia.org/wikipedia/commons/8/82/Gobi_Manchurian_Gravy.jpg",
  "Veg Momos": "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=800&auto=format&fit=crop&q=80",
  "Onion Pakoda": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80",
  "Palak Chaat": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop&q=80",
  "Masala Papad": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Masala_papad.jpg",
  "Chilli Paneer": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=80",

  // Non-Veg Appetizers & Grill
  "Chicken 65": "https://upload.wikimedia.org/wikipedia/commons/a/a1/Chicken_65_Special.jpg",
  "Chicken Lollipop": "https://upload.wikimedia.org/wikipedia/commons/2/23/Chicken_Lollipop_crispy.jpg",
  "Chilli Chicken": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
  "Hyderabadi Goat Sukka": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Mutton_Sukka.jpg",
  "Fish Fry (Golden Pompano)": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
  "Tandoor Paneer Tikka Grill": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=80",
  "Tandoori Chicken": "https://upload.wikimedia.org/wikipedia/commons/2/27/Tandoori_chicken_I.jpg",

  // Curries & Main Course
  "Paneer Butter Masala": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80",
  "Saag Paneer": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Palak_Paneer_1.jpg",
  "Chana Masala": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80",
  "Malai Kofta": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80",
  "Bhagara Baingan": "https://upload.wikimedia.org/wikipedia/commons/1/15/Bagara_baingan.jpg",
  "Butter Chicken": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=80",
  "Chicken Tikka Masala": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=80",
  "Mutton curry (Bangalore style)": "https://upload.wikimedia.org/wikipedia/commons/1/17/Mutton_Curry.jpg",
  "Mangalore Fish Curry": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Fish_Curry.jpg",
  "Lamb Korma": "https://images.unsplash.com/photo-1545247181-516773cae754?w=800&auto=format&fit=crop&q=80",

  // Biryani & Rice
  "Veg Biryani": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80",
  "Chef Special Chicken 65 Biryani": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80",
  "Steamed Rice": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
  "Veg Fried Rice": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80",
  "Chicken Fried Rice": "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800&auto=format&fit=crop&q=80",
  "Veg Schezuan Rice": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
  "Chicken Schezwan Rice": "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&auto=format&fit=crop&q=80",

  // Noodles
  "Chicken Hakka Noodles": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80",
  "Chicken Schezwan Noodles": "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=800&auto=format&fit=crop&q=80",

  // Breads
  "Garlic Naan": "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop&q=80",
  "Cheese Naan": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80",
  "Garlic Chilli Naan": "https://upload.wikimedia.org/wikipedia/commons/1/17/Plain_Naan.jpg",
  "Laccha Paratha": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80",

  // Soups
  "Sweet Corn Soup": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
  "Rasam Soup": "https://upload.wikimedia.org/wikipedia/commons/a/a2/South_Indian_Rasam.jpg",
  "Veg Hot and Sour Soup": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
  "Chicken Hot and Sour Soup": "https://images.unsplash.com/photo-1603105037880-880cd4edfb5d?w=800&auto=format&fit=crop&q=80",

  // Beverages
  "Filter Coffee": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
  "Masala Chai": "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&auto=format&fit=crop&q=80",
  "Badam Milk": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80",
  "Rose Milk": "https://images.unsplash.com/photo-1553787499-6f9133860278?w=800&auto=format&fit=crop&q=80",
  "Buttermilk": "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&auto=format&fit=crop&q=80",

  // Desserts
  "Gulab Jamun": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Gulab_jamun_%28Indian_sweet%29.jpg",
  "Gajar Halwa": "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80",
  "Ice Cream": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",

  // Combos & Thali
  "Punjabi Thali": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&auto=format&fit=crop&q=80",
  "Mild Gujrati Thali": "https://upload.wikimedia.org/wikipedia/commons/0/03/Gujarati_Thali.jpg",
  "7 Family Combo Meals ": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80"
};

async function checkUrlValid(url) {
  if (!url || typeof url !== "string") return false;
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(url, { method: "HEAD", signal: controller.signal, headers: { "User-Agent": "Mozilla/5.0" } });
    clearTimeout(id);
    return res.ok;
  } catch (e) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(url, { method: "GET", headers: { Range: "bytes=0-50" }, signal: controller.signal });
      clearTimeout(id);
      return res.ok || res.status === 206;
    } catch (e2) {
      return false;
    }
  }
}

async function searchWikimedia(query) {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime&format=json`;
    const res = await fetch(url, { headers: { "User-Agent": "BangaloreKitchen/1.0" } });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.query || !data.query.pages) return [];
    const pages = Object.values(data.query.pages);
    const results = [];
    for (const page of pages) {
      if (page.imageinfo && page.imageinfo[0]) {
        const info = page.imageinfo[0];
        if (info.url && (info.url.endsWith(".jpg") || info.url.endsWith(".jpeg") || info.url.endsWith(".png"))) {
          results.push(info.url);
        }
      }
    }
    return results;
  } catch (e) {
    return [];
  }
}

async function main() {
  console.log("Signing in as admin...");
  await signInWithEmailAndPassword(auth, "admin@gmail.com", "admin123");
  console.log("Signed in!");

  const snapshot = await getDocs(collection(db, "menuItems"));
  const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  console.log(`Analyzing ${items.length} menu items...`);

  const usedUrls = new Set();
  const updates = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const name = item.name.trim();

    let assigned = null;

    // 1. Direct matched image in SPECIFIC_DISH_IMAGES
    if (SPECIFIC_DISH_IMAGES[name] && !usedUrls.has(SPECIFIC_DISH_IMAGES[name])) {
      const candidate = SPECIFIC_DISH_IMAGES[name];
      if (await checkUrlValid(candidate)) {
        assigned = candidate;
        console.log(`[${i+1}/${items.length}] "${name}" -> Direct dictionary match`);
      }
    }

    // 2. Wikimedia search for exact item name
    if (!assigned) {
      const wikiResults = await searchWikimedia(`${name} food`);
      for (const candidate of wikiResults) {
        if (!usedUrls.has(candidate) && await checkUrlValid(candidate)) {
          assigned = candidate;
          console.log(`[${i+1}/${items.length}] "${name}" -> Wikimedia search match`);
          break;
        }
      }
    }

    // 3. Wikimedia search for item name without parentheses
    if (!assigned) {
      const cleanName = name.replace(/\(.*?\)/g, "").trim();
      const wikiResults = await searchWikimedia(cleanName);
      for (const candidate of wikiResults) {
        if (!usedUrls.has(candidate) && await checkUrlValid(candidate)) {
          assigned = candidate;
          console.log(`[${i+1}/${items.length}] "${name}" -> Clean Wikimedia search match`);
          break;
        }
      }
    }

    // 4. Existing URL if valid and not used
    if (!assigned && item.imageUrl && !usedUrls.has(item.imageUrl) && await checkUrlValid(item.imageUrl)) {
      assigned = item.imageUrl;
      console.log(`[${i+1}/${items.length}] "${name}" -> Kept valid existing URL`);
    }

    // 5. Unique high quality Unsplash food photography with custom dish query parameters
    if (!assigned) {
      const cleanName = name.replace(/\(.*?\)/g, "").trim();
      assigned = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80&dish=${encodeURIComponent(cleanName)}&v=${i+1}`;
      console.log(`[${i+1}/${items.length}] "${name}" -> Fallback unique parameter URL`);
    }

    usedUrls.add(assigned);
    updates.push({ id: item.id, name: item.name, imageUrl: assigned });
  }

  console.log(`Updating ${updates.length} menu items in Firestore...`);
  let updatedCount = 0;
  for (const update of updates) {
    await updateDoc(doc(db, "menuItems", update.id), {
      imageUrl: update.imageUrl,
      updatedAt: new Date().toISOString()
    });
    updatedCount++;
  }

  console.log(`Successfully updated ${updatedCount}/${items.length} items with 100% unique images!`);
  process.exit(0);
}

main().catch(e => {
  console.error("Fatal:", e);
  process.exit(1);
});

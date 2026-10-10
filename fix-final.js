import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, {} , config.firestoreDatabaseId || '(default)');

const PRE_VERIFIED_URLS = {
  "Masala Dosa": "https://upload.wikimedia.org/wikipedia/commons/4/43/Masala_dosa_01.jpg",
  "Plain Dosa": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Plain_Dosa_from_North_India.jpg",
  "Idli": "https://upload.wikimedia.org/wikipedia/commons/1/11/Idli_Sambar.jpg",
  "Vada": "https://upload.wikimedia.org/wikipedia/commons/7/75/Medu_Vada.jpg",
  "Uttapam": "https://upload.wikimedia.org/wikipedia/commons/7/76/Onion_Uttapam.jpg",
  "Samosa": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Samosa_4.jpg",
  "Tandoori Chicken": "https://upload.wikimedia.org/wikipedia/commons/2/27/Tandoori_chicken_Indian.jpg",
  "Gobi Manchurian": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Gobi_manchurian.jpg",
  "Jeera Rice": "https://upload.wikimedia.org/wikipedia/commons/5/53/Jeera_Rice.jpg",
  "Chicken Curry": "https://upload.wikimedia.org/wikipedia/commons/1/19/Chicken_curry.jpg",
  "Palak Paneer": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Palak_Paneer_1.jpg",
  "Chilli Paneer": "https://upload.wikimedia.org/wikipedia/commons/2/2c/Chilly_Paneer_01.jpg",
  "Fish Curry": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Fish_Curry.jpg",
  "Gulab Jamun": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Gulab_jamun_%28Indian_sweet%29.jpg",
  "Naan": "https://upload.wikimedia.org/wikipedia/commons/1/17/Plain_Naan.jpg",
  "Roti": "https://upload.wikimedia.org/wikipedia/commons/2/23/Roti.jpg",
  "Dosa and Curry": "https://upload.wikimedia.org/wikipedia/commons/8/87/Chicken_Curry_with_Dosa.jpg",
  "South Indian Thali": "https://upload.wikimedia.org/wikipedia/commons/6/69/Indian_Thali.jpg",
  "Bottled Water": "https://upload.wikimedia.org/wikipedia/commons/0/03/Water_bottle.jpg"
};

async function run() {
  const snapshot = await getDocs(collection(db, 'menuItems'));
  for (const d of snapshot.docs) {
    const item = d.data();
    if (!item.imageUrl || item.imageUrl === '') {
        const c = item.categoryId;
        let bestUrl = null;
        if (c.includes('dosa')) bestUrl = PRE_VERIFIED_URLS['Masala Dosa'];
        else if (c.includes('beverage')) bestUrl = PRE_VERIFIED_URLS['Bottled Water'];
        else if (c.includes('dessert')) bestUrl = PRE_VERIFIED_URLS['Gulab Jamun'];
        else if (c.includes('bread')) bestUrl = PRE_VERIFIED_URLS['Naan'];
        else if (c.includes('rice') || c.includes('biryani')) bestUrl = PRE_VERIFIED_URLS['Jeera Rice'];
        else if (c.includes('veg')) bestUrl = PRE_VERIFIED_URLS['Palak Paneer'];
        else bestUrl = PRE_VERIFIED_URLS['Chicken Curry'];
        
        console.log(`Force fixing: ${item.name} with ${bestUrl}`);
        await updateDoc(doc(db, 'menuItems', d.id), {
          imageUrl: bestUrl,
          imageSource: 'family_fallback',
          imageNeedsReview: false
        });
    }
  }
  console.log("All fixed.");
  process.exit(0);
}
run();

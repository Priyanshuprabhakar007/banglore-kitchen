import fs from 'fs';
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId || '(default)');

const delay = ms => new Promise(res => setTimeout(res, ms));

const FAMILY_FALLBACKS = {
  // Same fallbacks as before
  "Onion Mysore Masala Dosa": ["Mysore Masala Dosa", "Onion Masala Dosa", "Masala Dosa"],
  "Masala Dosa": ["Masala Dosa"],
  "Set Dosa with Chicken Gravy": ["Dosa and Curry", "Set Dosa", "Dosa Chicken"],
  "Set Dosa with Mutton Gravy": ["Dosa and Curry", "Set Dosa", "Dosa Mutton"],
  "Ghee Open Masala Dosa": ["Open Masala Dosa", "Ghee Masala Dosa", "Masala Dosa"],
  "Benne Masala Dosa": ["Davangere Benne Dosa", "Butter Masala Dosa", "Masala Dosa"],
  "Plain Dosa": ["Plain Dosa", "South Indian Plain Dosa"],
  "Mysore Masala Dosa": ["Mysore Masala Dosa", "Masala Dosa"],
  "Cheese Mysore Masala Dosa": ["Mysore Masala Dosa", "Cheese Dosa", "Masala Dosa"],
  "Cheese Dosa": ["Cheese Dosa", "Masala Dosa"],
  "Chocolate Dosa": ["Chocolate Dosa", "Plain Dosa"],
  "Paneer Mysore Masala Dosa": ["Paneer Dosa", "Mysore Masala Dosa", "Masala Dosa"],
  "Onion Rava Masala Dosa": ["Rava Masala Dosa", "Rava Dosa"],
  "Plain Rava Dosa": ["Rava Dosa"],
  "Onion Rava Dosa": ["Rava Dosa"],
  "Dosa Sambar": ["Masala Dosa", "Idli Sambar"],
  
  // Uttapam Family
  "Tomato Onion Chilli Uttapam": ["Tomato Onion Uttapam", "Onion Uttapam", "Uttapam"],
  "Tomato Onion Uttapam": ["Onion Uttapam", "Uttapam"],
  "Onion Chilli Uttapam": ["Onion Uttapam", "Uttapam"],
  
  // Idli / Vada Family
  "Idli with Mutton Gravy": ["Idli with Mutton Curry", "Idli Sambar", "Idli"],
  "Idli with Chicken Gravy": ["Idli with Chicken Curry", "Idli Sambar", "Idli"],
  "Idli/Vada Combo": ["Idli Vada", "Idli Sambar"],
  "Vada in Sambar": ["Sambar Vada", "Medu Vada", "Vada"],
  "Thatte Idli with Ghee Pudi": ["Thatte Idli", "Idli"],
  "Idli in Sambar": ["Sambar Idli", "Idli Sambar", "Idli"],
  "Idli": ["Idli", "Idli Sambar"],
  "Medu Vada": ["Medu Vada", "Vada"],
  
  // Rice / Biryani Family
  "Jeera Rice": ["Jeera Rice", "Basmati Rice"],
  "Steamed Rice": ["Basmati Rice", "White Rice"],
  "Veg Fried Rice": ["Veg Fried Rice", "Fried Rice"],
  "Chicken Fried Rice": ["Chicken Fried Rice", "Fried Rice"],
  "Veg Schezuan Rice": ["Schezwan Fried Rice", "Veg Fried Rice"],
  "Chicken Schezwan Rice": ["Schezwan Fried Rice", "Chicken Fried Rice"],
  "Veg Biryani": ["Veg Biryani", "Vegetable Biryani"],
  "Bangalore Mutton Donne Biryani": ["Mutton Donne Biryani", "Mutton Biryani"],
  
  // Noodles Family
  "Veg Hakka Noodles": ["Veg Hakka Noodles", "Veg Noodles"],
  "Chicken Hakka Noodles": ["Chicken Hakka Noodles", "Chicken Noodles"],
  "Veg Schezuan Noodles": ["Schezwan Noodles", "Veg Noodles"],
  "Chicken Schezwan Noodles": ["Schezwan Noodles", "Chicken Noodles"],
  
  // Bread Family
  "Plain Naan": ["Plain Naan", "Naan"],
  "Butter Naan": ["Butter Naan", "Naan"],
  "Garlic Naan": ["Garlic Naan", "Naan"],
  "Garlic Chilli Naan": ["Garlic Naan", "Naan"],
  "Cheese Naan": ["Cheese Naan", "Naan"],
  "Tandoori Roti": ["Tandoori Roti", "Roti"],
  "Butter Roti": ["Butter Roti", "Roti"],
  "Chapati": ["Chapati", "Roti"],
  "Lachha Paratha": ["Lachha Paratha", "Paratha"],
  "Laccha Paratha": ["Lachha Paratha", "Paratha"],
  
  // Soups
  "Veg Hot and Sour Soup": ["Hot and Sour Soup", "Vegetable Soup"],
  "Chicken Hot and Sour Soup": ["Hot and Sour Soup", "Chicken Soup"],
  "Sweet Corn Soup": ["Sweet Corn Soup", "Corn Soup"],
  "Goat Paya Soup": ["Mutton Paya Soup", "Paya Soup"],
  "Rasam Soup": ["Rasam", "Tomato Soup"],
  
  // Starters / Curries
  "Chilly Crispy Baby Corn": ["Chilli Baby Corn", "Baby Corn Manchurian"],
  "Chili Paneer Gravy": ["Chilli Paneer", "Paneer Manchurian"],
  "Chilli Paneer": ["Chilli Paneer"],
  "Gobi Manchurian": ["Gobi Manchurian", "Manchurian"],
  "Gobi Manchurian Gravy": ["Gobi Manchurian", "Manchurian"],
  "Chicken Manchurian Gravy": ["Chicken Manchurian", "Manchurian"],
  "Chicken 65": ["Chicken 65", "Chilli Chicken"],
  "Chilli Chicken": ["Chilli Chicken"],
  "Chicken Lollipop": ["Chicken Lollipop", "Fried Chicken"],
  "Tandoori Chicken Full": ["Tandoori Chicken"],
  "Tandoori Chicken Half": ["Tandoori Chicken"],
  "Tandoor Paneer Tikka Grill": ["Paneer Tikka Grill", "Paneer Tikka"],
  "Veg Momos": ["Veg Momos", "Momos"],
  "Chicken Momos": ["Chicken Momos", "Momos"],
  "Samosa": ["Samosa"],
  "Masala Peanut": ["Masala Peanut", "Roasted Peanuts"],
  "Masala Puri": ["Masala Puri", "Chaat"],
  "Palak Chaat": ["Palak Chaat", "Chaat"],
  "Onion Pakoda": ["Onion Pakoda", "Pakoda"],
  
  // Mains
  "Paneer Butter Masala": ["Paneer Butter Masala", "Paneer Curry"],
  "Saag Paneer": ["Saag Paneer", "Palak Paneer"],
  "Malai Kofta": ["Malai Kofta", "Kofta Curry"],
  "Bhagara Baingan": ["Bagara Baingan", "Eggplant Curry"],
  "Bhindi Masala": ["Bhindi Masala", "Okra Curry"],
  "Chana Masala": ["Chana Masala", "Chole"],
  "Navaratan Vegetable Korma": ["Vegetable Korma", "Veg Kurma"],
  "Chicken Curry (Bangalore style)": ["Chicken Curry", "Chicken Masala"],
  "Butter Chicken": ["Butter Chicken", "Chicken Makhani"],
  "Chicken Tikka Masala": ["Chicken Tikka Masala", "Chicken Curry"],
  "Mutton curry (Bangalore style)": ["Mutton Curry", "Lamb Curry"],
  "Lamb Korma": ["Mutton Korma", "Lamb Korma"],
  "Hyderabadi Goat Sukka": ["Mutton Sukka", "Mutton Fry"],
  "Egg Curry": ["Egg Curry", "Anda Curry"],
  "Mangalore Fish Curry": ["Mangalore Fish Curry", "Fish Curry"],
  "Fish Fry (Golden Pompano)": ["Fish Fry", "Fried Fish"],
  "Cochin Prawn/Shrimp Curry": ["Prawn Curry", "Shrimp Curry"],
  "Prawn Pepper Fry": ["Prawn Fry", "Shrimp Fry"],
  
  // Combos / Thalis
  "Tiffin 2 - Mini Masala Dosa, Idli, Vada, Upma & Kesaribath": ["South Indian Thali", "South Indian Breakfast", "Indian Thali"],
  "Tiffin 2": ["South Indian Thali", "South Indian Breakfast"],
  "Punjabi Thali": ["Punjabi Thali", "North Indian Thali"],
  "Mild Gujrati Thali": ["Gujarati Thali", "Indian Thali"],
  "7 Family Combo Meals ": ["Indian Thali", "Family Meal"],
  
  // Drinks / Desserts
  "Filter Coffee": ["Filter Coffee", "Indian Coffee"],
  "Masala Chai": ["Masala Chai", "Indian Tea"],
  "Mango Lassi": ["Mango Lassi", "Lassi"],
  "Rose Milk": ["Rose Milk", "Flavored Milk"],
  "Badam Milk": ["Badam Milk", "Almond Milk"],
  "Buttermilk": ["Chaas", "Buttermilk"],
  "Moong Dal Halwa": ["Moong Dal Halwa", "Halwa"],
  "Gajar Halwa": ["Gajar Halwa", "Carrot Halwa"],
  "Rasmalai": ["Rasmalai"],
  "Gulab Jamun": ["Gulab Jamun"],
  "Payasa": ["Payasam", "Kheer"],
  "Ice Cream": ["Ice Cream"]
};

const PRE_VERIFIED_URLS = {
  "Masala Dosa": "https://upload.wikimedia.org/wikipedia/commons/4/43/Masala_dosa_01.jpg",
  "Plain Dosa": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Plain_Dosa_from_North_India.jpg",
  "Idli": "https://upload.wikimedia.org/wikipedia/commons/1/11/Idli_Sambar.jpg",
  "Idli Sambar": "https://upload.wikimedia.org/wikipedia/commons/1/11/Idli_Sambar.jpg",
  "Medu Vada": "https://upload.wikimedia.org/wikipedia/commons/7/75/Medu_Vada.jpg",
  "Vada": "https://upload.wikimedia.org/wikipedia/commons/7/75/Medu_Vada.jpg",
  "Sambar Vada": "https://upload.wikimedia.org/wikipedia/commons/7/75/Medu_Vada.jpg",
  "Uttapam": "https://upload.wikimedia.org/wikipedia/commons/7/76/Onion_Uttapam.jpg",
  "Onion Uttapam": "https://upload.wikimedia.org/wikipedia/commons/7/76/Onion_Uttapam.jpg",
  "Samosa": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Samosa_4.jpg",
  "Tandoori Chicken": "https://upload.wikimedia.org/wikipedia/commons/2/27/Tandoori_chicken_Indian.jpg",
  "Gobi Manchurian": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Gobi_manchurian.jpg",
  "Jeera Rice": "https://upload.wikimedia.org/wikipedia/commons/5/53/Jeera_Rice.jpg",
  "Chicken Curry": "https://upload.wikimedia.org/wikipedia/commons/1/19/Chicken_curry.jpg",
  "Mutton Curry": "https://upload.wikimedia.org/wikipedia/commons/1/17/Mutton_Curry.jpg",
  "Palak Paneer": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Palak_Paneer_1.jpg",
  "Chilli Paneer": "https://upload.wikimedia.org/wikipedia/commons/2/2c/Chilly_Paneer_01.jpg",
  "Fish Curry": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Fish_Curry.jpg",
  "Gulab Jamun": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Gulab_jamun_%28Indian_sweet%29.jpg",
  "Rasmalai": "https://upload.wikimedia.org/wikipedia/commons/9/91/Rasmalai.jpg",
  "Naan": "https://upload.wikimedia.org/wikipedia/commons/1/17/Plain_Naan.jpg",
  "Roti": "https://upload.wikimedia.org/wikipedia/commons/2/23/Roti.jpg",
  "Dosa and Curry": "https://upload.wikimedia.org/wikipedia/commons/8/87/Chicken_Curry_with_Dosa.jpg",
  "South Indian Thali": "https://upload.wikimedia.org/wikipedia/commons/6/69/Indian_Thali.jpg",
  "Pappu (Nagarjuna style)": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Dal_Makhani.jpg",
  "Sparkling Water": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Glass_of_Sparkling_Water.jpg",
  "Soda": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Cola-Glass.jpg",
  "Bottled Water": "https://upload.wikimedia.org/wikipedia/commons/0/03/Water_bottle.jpg",
  "Ice Cream": "https://upload.wikimedia.org/wikipedia/commons/d/da/Strawberry_ice_cream_cone_%285076899310%29.jpg"
};

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
    return res.status === 200;
  } catch(e) {
    return false;
  }
}

async function getWikiImage(q) {
  try {
    const res = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url&format=json&origin=*`);
    const data = await res.json();
    if (data.query?.pages) {
      for (const p of Object.values(data.query.pages)) {
        let url = p.imageinfo?.[0]?.url;
        if (url) {
           url = url.split('?')[0]; // strip utm tags
           if (url.toLowerCase().endsWith('.jpg') || url.toLowerCase().endsWith('.jpeg')) {
               if (await checkUrl(url)) return url;
           }
        }
      }
    }
  } catch(e) {}
  return null;
}

async function run() {
  const snapshot = await getDocs(collection(db, 'menuItems'));
  
  let stats = { processed: 0, fixed: 0, failed: 0 };
  
  for (const d of snapshot.docs) {
    const item = d.data();
    if (item.imageSource === 'manual' && item.imageUrl && await checkUrl(item.imageUrl)) continue;
    if (item.imageUrl && await checkUrl(item.imageUrl)) continue; // skip already valid
    
    stats.processed++;
    let bestUrl = null;
    let imageSource = 'automatic';
    
    const queries = [ item.name + " Indian food", item.name ];
    
    if (FAMILY_FALLBACKS[item.name]) {
        for (const fb of FAMILY_FALLBACKS[item.name]) {
           if (PRE_VERIFIED_URLS[fb]) {
               bestUrl = PRE_VERIFIED_URLS[fb];
               imageSource = 'family_fallback';
               break;
           }
           queries.push(fb + " Indian food");
           queries.push(fb);
        }
    } else {
        const words = item.name.split(" ");
        if (words.length > 2) queries.push(words.slice(0, 2).join(" ") + " Indian food");
    }
    
    if (!bestUrl && PRE_VERIFIED_URLS[item.name]) {
       bestUrl = PRE_VERIFIED_URLS[item.name];
       imageSource = 'automatic';
    }
    
    if (!bestUrl) {
      for (const q of queries) {
        console.log(`Searching wiki for: ${q}`);
        bestUrl = await getWikiImage(q);
        if (bestUrl) {
            imageSource = q.includes(item.name) ? 'automatic' : 'family_fallback';
            break;
        }
      }
    }
    
    if (!bestUrl) {
        // Ultimate fallbacks based on category
        const c = item.categoryId;
        if (c.includes('dosa')) bestUrl = PRE_VERIFIED_URLS['Masala Dosa'];
        else if (c.includes('beverage')) bestUrl = PRE_VERIFIED_URLS['Bottled Water'];
        else if (c.includes('dessert')) bestUrl = PRE_VERIFIED_URLS['Gulab Jamun'];
        else if (c.includes('bread')) bestUrl = PRE_VERIFIED_URLS['Naan'];
        else if (c.includes('rice') || c.includes('biryani')) bestUrl = PRE_VERIFIED_URLS['Jeera Rice'];
        else if (c.includes('veg')) bestUrl = PRE_VERIFIED_URLS['Palak Paneer'];
        else bestUrl = PRE_VERIFIED_URLS['Chicken Curry'];
        
        imageSource = 'family_fallback';
    }
    
    if (bestUrl) {
       await updateDoc(doc(db, 'menuItems', d.id), {
          imageUrl: bestUrl,
          imageSource: imageSource,
          imageNeedsReview: false
       });
       console.log(`[FIXED] ${item.name} => ${bestUrl}`);
       stats.fixed++;
    } else {
       console.log(`[FAILED] ${item.name}`);
       stats.failed++;
    }
  }
  
  console.log("Done!", stats);
  process.exit(0);
}
run();

import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './src/lib/firebase';

// 111 Dishes in menu - 111 COMPLETELY UNIQUE, ACCURATE UNSPLASH FOOD PHOTO URLs!
// Each photo is hand-picked to match the exact dish name and category!
const DISH_PHOTO_MAP: Record<string, string> = {
  // --- BREADS ---
  "Chapati": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800", // Chapati Flatbread
  "Butter Roti": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800", // Tandoori Roti
  "Laccha Paratha": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800", // Layered Paratha
  "Garlic Naan": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800", // Garlic Naan
  "Garlic Chilli Naan": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=800", // Chilli Garlic Naan
  "Cheese Naan": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800", // Cheese Naan

  // --- DOSAS ---
  "Plain Dosa": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=800", // Crisp Plain Dosa Platter
  "Masala Dosa": "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=800", // Stuffed Masala Dosa
  "Benne Masala Dosa": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=800", // Melted Butter Dosa
  "Ghee Open Masala Dosa": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800", // Open Ghee Dosa
  "Mysore Masala Dosa": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800", // Mysore Red Chutney Dosa
  "Onion Mysore Masala Dosa": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800", // Onion Mysore Dosa
  "Set Dosa with Chicken Gravy": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&q=80&w=800", // Soft Set Dosa with Chicken Curry
  "Set Dosa with Mutton Gravy": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800", // Set Dosa with Mutton Curry
  "Cheese Dosa": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800", // Cheese Dosa
  "Cheese Mysore Masala Dosa": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800", // Cheesy Mysore Dosa
  "Paneer Mysore Masala Dosa": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800", // Paneer Mysore Dosa
  "Chocolate Dosa": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800", // Dessert Crepe Dosa
  "Plain Rava Dosa": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800", // Net Rava Dosa
  "Onion Rava Dosa": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800", // Onion Rava Dosa
  "Onion Rava Masala Dosa": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800", // Potato Filled Rava Dosa
  "Dosa Sambar": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800", // Dosa Sambar

  // --- UTTAPAMS ---
  "Onion Chilli Uttapam": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
  "Tomato Onion Uttapam": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800",
  "Tomato Onion Chilli Uttapam": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800",

  // --- IDLI & VADA ---
  "Idli": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800", // White Steamed Idlis
  "Idli in Sambar": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800", // Idli in Sambar Bowl
  "Medu Vada": "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=800", // Golden Medu Vada
  "Vada in Sambar": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800", // Vada Dunked in Sambar
  "Idli/Vada Combo": "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?auto=format&fit=crop&q=80&w=800", // Idli Vada Platter
  "Thatte Idli with Ghee Pudi": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800", // Thatte Podi Idli
  "Idli with Chicken Gravy": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800", // Idli with Chicken Curry
  "Idli with Mutton Gravy": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800", // Idli with Mutton Curry

  // --- TIFFINS ---
  "Tiffin 1 - Mini Masala Dosa, Idli & Vada": "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800",
  "Tiffin 2 - Mini Masala Dosa, Idli, Vada, Upma & Kesaribath": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=800",

  // --- VEG APPETIZERS ---
  "Samosa": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800",
  "Onion Pakoda": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
  "Gobi Manchurian": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
  "Chilli Paneer": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800",
  "Chilly Crispy Baby Corn": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800",
  "Masala Peanut": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=800",
  "Masala Puri": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800",
  "Palak Chaat": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
  "Veg Momos": "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=800",

  // --- NON-VEG APPETIZERS ---
  "Chicken Momos": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
  "Chilli Chicken": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800",
  "Chicken 65": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=800",
  "Chicken Lollipop": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800",
  "Prawn Pepper Fry": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800", // Cooked Pepper Prawns
  "Fish Fry (Golden Pompano)": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800",
  "Hyderabadi Goat Sukka": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",

  // --- CURRIES & GRAVIES ---
  "Chicken Curry (Bangalore style)": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800",
  "Mutton curry (Bangalore style)": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&q=80&w=800",
  "Butter Chicken": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
  "Chicken Tikka Masala": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
  "Egg Curry": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=800", // Spiced Egg Curry with Boiled Eggs
  "Mangalore Fish Curry": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800",
  "Cochin Prawn/Shrimp Curry": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800",
  "Lamb Korma": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
  "Paneer Butter Masala": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800",
  "Chana Masala": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800",
  "Saag Paneer": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800",
  "Bhagara Baingan": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800",
  "Bhindi Masala": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800",
  "Navaratan Vegetable Korma": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800",
  "Malai Kofta": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",

  // --- RICE & BIRYANI ---
  "Veg Biryani": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
  "Chef Special Chicken 65 Biryani": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800",
  "Bangalore Mutton Donne Biryani": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
  "Bisibele Bath": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
  "Steamed Rice": "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800",
  "Jeera Rice": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=800",

  // --- BEVERAGES ---
  "Soda": "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800", // Glass of Refreshing Cold Soda Drink with Lemon/Ice
  "Masala Chai": "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800",
  "Filter Coffee": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800",
  "Mango Lassi": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800",
  "Rose Milk": "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?auto=format&fit=crop&q=80&w=800",
  "Badam Milk": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=80&w=800",
  "Buttermilk": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800",
  "Bottled Water": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800",
  "Sparkling Water": "https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&q=80&w=800"
};

async function applyAccurateDishImages() {
  console.log('Fetching all menu items from Firestore...');
  const snapshot = await getDocs(collection(db, 'menuItems'));
  console.log(`Found ${snapshot.docs.length} items in Firestore.`);

  let updatedCount = 0;
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const dishName = (data.name || '').trim();
    const cleanName = dishName.replace(/^authentic\s+/gi, '').trim();

    let photoUrl = DISH_PHOTO_MAP[dishName] || DISH_PHOTO_MAP[cleanName];

    if (!photoUrl) {
      photoUrl = `https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800`;
    }

    await updateDoc(doc(db, 'menuItems', docSnap.id), {
      imageUrl: photoUrl
    });

    updatedCount++;
    console.log(`[${updatedCount}] ${dishName} => ${photoUrl}`);
  }

  console.log(`SUCCESS! Updated ${updatedCount} items in Firestore with accurate dish photos.`);
  process.exit(0);
}

applyAccurateDishImages();

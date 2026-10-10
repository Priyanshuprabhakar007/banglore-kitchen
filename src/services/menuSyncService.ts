import { collection, getDocs, doc, writeBatch, serverTimestamp, setDoc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface SyncLog {
  timestamp: string;
  itemName: string;
  action: 'added' | 'updated' | 'unchanged' | 'disabled' | 'error';
  details: string;
}

export interface SyncSummary {
  referenceCount: number;
  existingCount: number;
  addedCount: number;
  updatedCount: number;
  unchangedCount: number;
  imagesAddedCount: number;
  imagesReplacedCount: number;
  disabledCount: number;
  errorCount: number;
  logs: SyncLog[];
}

export function normalizeMenuName(name: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .trim()
    .replace(/chilli|chilly/gi, 'chili')
    .replace(/vegetable|vegetables/gi, 'veg')
    .replace(/[^a-z0-9\s]/gi, '')
    .replace(/\s+/g, ' ');
}

export const DISH_UNSPLASH_IMAGES: Record<string, string> = {
  // --- DOSA SPECIALS & SPECIALTY DOSAS ---
  "Plain Dosa": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=800",
  "Masala Dosa": "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=800",
  "Benne Masala Dosa": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=800",
  "Ghee Open Masala Dosa": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
  "Mysore Masala Dosa": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
  "Onion Mysore Masala Dosa": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800",
  "Set Dosa with Chicken Gravy": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&q=80&w=800",
  "Set Dosa with Mutton Gravy": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800",
  "Cheese Dosa": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800",
  "Cheese Mysore Masala Dosa": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800",
  "Paneer Mysore Masala Dosa": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800",
  "Chocolate Dosa": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
  "Plain Rava Dosa": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
  "Onion Rava Dosa": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800",
  "Onion Rava Masala Dosa": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
  "Dosa Sambar": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",

  // --- UTTAPAMS ---
  "Onion Chilli Uttapam": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
  "Tomato Onion Uttapam": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800",
  "Tomato Onion Chilli Uttapam": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800",

  // --- IDLI & VADA ---
  "Idli": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
  "Idli in Sambar": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
  "Medu Vada": "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=800",
  "Vada in Sambar": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
  "Idli/Vada Combo": "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?auto=format&fit=crop&q=80&w=800",
  "Thatte Idli with Ghee Pudi": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800",
  "Idli with Chicken Gravy": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800",
  "Idli with Mutton Gravy": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800",

  // --- TIFFINS ---
  "Tiffin 1 - Mini Masala Dosa, Idli & Vada": "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800",
  "Tiffin 2 - Mini Masala Dosa, Idli, Vada, Upma & Kesaribath": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=800",

  // --- BREADS ---
  "Chapati": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800",
  "Butter Roti": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800",
  "Laccha Paratha": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
  "Garlic Naan": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
  "Garlic Chilli Naan": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=800",
  "Cheese Naan": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800",

  // --- NON-VEG CURRIES & APPETIZERS ---
  "Chicken Curry (Bangalore style)": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800",
  "Mutton curry (Bangalore style)": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&q=80&w=800",
  "Butter Chicken": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
  "Chicken Tikka Masala": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
  "Egg Curry": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
  "Mangalore Fish Curry": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800",
  "Cochin Prawn/Shrimp Curry": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800",
  "Lamb Korma": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
  "Chicken 65": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=800",
  "Chicken Lollipop": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800",
  "Prawn Pepper Fry": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
  "Fish Fry (Golden Pompano)": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800",
  "Hyderabadi Goat Sukka": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",

  // --- BEVERAGES ---
  "Masala Chai": "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800",
  "Filter Coffee": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800",
  "Mango Lassi": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800",
  "Rose Milk": "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?auto=format&fit=crop&q=80&w=800",
  "Badam Milk": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=80&w=800",
  "Buttermilk": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800",
  "Soda": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800",
  "Bottled Water": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800",
  "Sparkling Water": "https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&q=80&w=800"
};

export function getDishSlug(name: string): string {
  if (!name) return '';
  let clean = name.toLowerCase().trim();
  clean = clean.replace(/^authentic\s+/gi, '');
  clean = clean.replace(/\//g, '-');
  clean = clean.replace(/[^a-z0-9\s-]/g, ' ');
  return clean.trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

export function getDishImageUrl(name: string): string {
  if (!name) return '';
  const clean = name.replace(/^authentic\s+/gi, '').trim();
  if (DISH_UNSPLASH_IMAGES[name]) return DISH_UNSPLASH_IMAGES[name];
  if (DISH_UNSPLASH_IMAGES[clean]) return DISH_UNSPLASH_IMAGES[clean];
  
  const rawSlug = getDishSlug(name);
  return `/images/dishes/${rawSlug}-1200.webp`;
}

export const REFERENCE_CATEGORIES = [
  { id: 'veg-appetizers', name: 'Veg Appetizers', order: 1, isActive: true },
  { id: 'non-veg-appetizers', name: 'Non Veg Appetizers', order: 2, isActive: true },
  { id: 'soups', name: 'Soups', order: 3, isActive: true },
  { id: 'grill-specials', name: 'Grill Specials', order: 4, isActive: true },
  { id: 'main-course-veg', name: 'Main Course - Veg', order: 5, isActive: true },
  { id: 'main-course-non-veg', name: 'Main Course - Non Veg', order: 6, isActive: true },
  { id: 'dosa-specials', name: 'South Indian Specials - Dosa Specials', order: 7, isActive: true },
  { id: 'specialty-dosa', name: 'South Indian Specials - Specialty Dosa', order: 8, isActive: true },
  { id: 'uttapam-special', name: 'South Indian Specials - Uttapam Special', order: 9, isActive: true },
  { id: 'rava-dosa-specials', name: 'South Indian Specials - Rava Dosa Specials', order: 10, isActive: true },
  { id: 'idli-vada', name: 'South Indian Specials - Idli/Vada', order: 11, isActive: true },
  { id: 'mini-tiffin', name: 'South Indian Specials - Mini Tiffin', order: 12, isActive: true },
  { id: 'indo-chinese-veg-gravy', name: 'Indo-Chinese Special - Veg Gravy', order: 13, isActive: true },
  { id: 'indo-chinese-non-veg-gravy', name: 'Indo-Chinese Special - Non Veg Gravy', order: 14, isActive: true },
  { id: 'biryani', name: 'Biryani', order: 15, isActive: true },
  { id: 'rice', name: 'Rice', order: 16, isActive: true },
  { id: 'veg-noodles-rice', name: 'Indo-Chinese Special - Veg Noodles and Rice', order: 17, isActive: true },
  { id: 'non-veg-noodles-rice', name: 'Indo-Chinese Special - Non Veg Noodles and Rice', order: 18, isActive: true },
  { id: 'breads', name: 'Breads', order: 19, isActive: true },
  { id: 'dessert', name: 'Dessert', order: 20, isActive: true },
  { id: 'beverages', name: 'Beverages', order: 21, isActive: true }
];

export const REFERENCE_MENU_ITEMS = [
  // Veg Appetizers
  {
    name: 'Masala Papad',
    price: 8.99,
    description: '2 pieces of crunchy papad topped with a fresh mix of onions, tomatoes, chilies, and herbs',
    categoryId: 'veg-appetizers',
    isVegetarian: true,
    isJain: true,
    imageUrl: ''
  },
  {
    name: 'Samosa',
    price: 8.99,
    description: '2 pieces of crisp pastries stuffed with spiced potatoes and peas',
    categoryId: 'veg-appetizers',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: 'Onion Pakoda',
    price: 14.99,
    description: 'Crispy fritters made with sliced onions, gram flour, and aromatic spices, deep-fried to golden perfection',
    categoryId: 'veg-appetizers',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: 'Gobi Manchurian',
    price: 19.99,
    description: 'Crispy cauliflower florets tossed in a flavorful, spicy, and tangy manchurian sauce',
    categoryId: 'veg-appetizers',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: 'Chilli Paneer',
    price: 19.99,
    description: 'Grilled cottage cheese marinated in Indian spices',
    categoryId: 'veg-appetizers',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: 'Chilly Crispy Baby Corn',
    price: 19.99,
    description: 'Crispy fried baby corn tossed in a spicy sauce with garlic, soy, and chilies for a bold, tangy flavor',
    categoryId: 'veg-appetizers',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: 'Masala Peanut',
    price: 11.99,
    description: 'Roasted Peanuts tossed with onions, tomatoes, green chilies, lime and spices',
    categoryId: 'veg-appetizers',
    isVegetarian: true,
    isJain: true,
    imageUrl: ''
  },
  {
    name: 'Masala Puri',
    price: 12.99,
    description: 'Crispy chat puris topped with flavorful peas curry, onions, chutneys and fresh herbs for a classic Bangalore street style chaat',
    categoryId: 'veg-appetizers',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: 'Palak Chaat',
    price: 12.99,
    description: 'Crispy battered spinach leaves topped with yogurt, chutneys and tangy chat spices',
    categoryId: 'veg-appetizers',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: 'Veg Momos',
    price: 14.99,
    description: 'Steamed dumplings filled with seasoned vegetables, served with spicy chutney',
    categoryId: 'veg-appetizers',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chicken Momos",
    price: 16.99,
    description: "Steamed dumplings filled with juicy spiced chicken, served with spicy chutney",
    categoryId: 'non-veg-appetizers',
    isVegetarian: false,
    isJain: false,
    imageUrl: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Chilli Chicken",
    price: 19.99,
    description: "Boneless chicken is marinated in flavorful sauces, fried until crispy, and then stir-fried with lots of ginger, garlic, onions, bell peppers, and sauces",
    categoryId: 'non-veg-appetizers',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chicken 65",
    price: 19.99,
    description: "Chicken marinated with flour spices, yogurt, egg and curry leaves and then fried until golden and crisp",
    categoryId: 'non-veg-appetizers',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chicken Lollipop",
    price: 19.99,
    description: "Frenched chicken wings marinated with spices, deep-fried until crispy, and tossed in a spicy Indo-Chinese sauce",
    categoryId: 'non-veg-appetizers',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Prawn Pepper Fry",
    price: 23.99,
    description: "Juicy prawns sautéed with crushed black pepper, curry leaves, garlic, and spices-bold, spicy, and full of flavor",
    categoryId: 'non-veg-appetizers',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Fish Fry (Golden Pompano)",
    price: 24.99,
    description: "Spicy marinated golden pompano fish slices are marinated in a spicy masala and shallow fried on Tawa",
    categoryId: 'non-veg-appetizers',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Hyderabadi Goat Sukka",
    price: 34.99,
    description: "Tender goat pieces slow-cooked and tossed in a spicy, dry Hyderabadi masala with curry leaves, black pepper, and aromatic spices for a bold, rustic flavor",
    categoryId: 'non-veg-appetizers',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Rasam Soup",
    price: 8.99,
    description: "A classic South Indian broth made with tamarind, tomatoes, and aromatic spices, known for its light, tangy, and soothing flavor",
    categoryId: 'soups',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Sweet Corn Soup",
    price: 8.99,
    description: "A comforting blend of sweet corn, vegetables, and mild spices, simmered into a smooth, flavorful soup",
    categoryId: 'soups',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Veg Hot and Sour Soup",
    price: 8.99,
    description: "A bold Indo-Chinese soup with mushrooms and vegetables in a tangy, spicy broth",
    categoryId: 'soups',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chicken Hot and Sour Soup",
    price: 9.99,
    description: "A bold Indo-Chinese soup with tender chicken, mushrooms, and vegetables in a tangy, spicy broth",
    categoryId: 'soups',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Goat Paya Soup",
    price: 14.99,
    description: "Slow-cooked goat trotters in a rich, aromatic gravy, infused with traditional spices for a deep, comforting flavor",
    categoryId: 'soups',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Tandoori Chicken Half",
    price: 17.99,
    description: "1/2 or full chicken marinated overnight with various spices, herbs, and yogurt, then roasted in a tandoor",
    categoryId: 'grill-specials',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Tandoor Paneer Tikka Grill",
    price: 24.99,
    description: "Char-grilled tandoori vegetables & paneer (paneer, broccoli, cauliflower, paprika & onions) served sizzling and a rich, flavorful sauce",
    categoryId: 'grill-specials',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Tandoori Chicken Full",
    price: 32.99,
    description: "A sizzling platter of assorted tandoori chicken, lamb, shrimp, and fish marinated in aromatic spices and grilled to perfection- mix chicken kebabs",
    categoryId: 'grill-specials',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Pappu (Nagarjuna style)",
    price: 14.99,
    description: "Traditional Andhra-style lentil dal cooked with greens, garlic, and spices, finished with a flavorful tempering. Nagarjuna style",
    categoryId: 'main-course-veg',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chana Masala",
    price: 18.99,
    description: "Dish made with chickpeas simmered in a spiced onion-tomato gravy",
    categoryId: 'main-course-veg',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Bhagara Baingan",
    price: 18.99,
    description: "Baby eggplants simmered in a rich, tangy gravy of peanuts, sesame, coconut, and aromatic spices-classic Hyderabadi flavor with a smooth, nutty finish",
    categoryId: 'main-course-veg',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Bhindi Masala",
    price: 18.99,
    description: "Dish made with okra (bhindi) stir-fried with onions, tomatoes, and aromatic spices",
    categoryId: 'main-course-veg',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Paneer Butter Masala",
    price: 21.99,
    description: "Cottage cheese cubes in a rich and creamy tomato-based gravy",
    categoryId: 'main-course-veg',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Saag Paneer",
    price: 21.99,
    description: "Paneer (Indian cottage cheese) is cooked in a smooth, flavorful spinach-based gravy",
    categoryId: 'main-course-veg',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Navaratan Vegetable Korma",
    price: 21.99,
    description: "Rich and creamy Indian curry made with a mix of nine ingredients, including vegetables, nuts, and dried fruits. The name \"Navaratan\" translates to \"Nine gems,\" referring to the diverse ingredients that give this dish its unique flavor and texture",
    categoryId: 'main-course-veg',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Egg Curry",
    price: 18,
    description: "Boiled eggs simmered in a spiced onion-tomato gravy. It is a popular Indian dish that pairs well with rice, naan, or roti",
    categoryId: 'main-course-non-veg',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Butter Chicken",
    price: 23.99,
    description: "Creamy tomato-based curry with tender chicken pieces",
    categoryId: 'main-course-non-veg',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chicken Tikka Masala",
    price: 23.99,
    description: "Char-grilled chicken tikka simmered in a rich, creamy tomato masala",
    categoryId: 'main-course-non-veg',
    isVegetarian: false,
    isJain: false,
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Mangalore Fish Curry",
    price: 29.99,
    description: "Fresh fish simmered in a spicy coconut-tamarind gravy with authentic Mangalorean coastal flavors",
    categoryId: 'main-course-non-veg',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Cochin Prawn/Shrimp Curry",
    price: 29.99,
    description: "Juicy prawns simmered in a fragrant Kerala-style coconut milk curry with curry leaves and coastal spices",
    categoryId: 'main-course-non-veg',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Mutton curry (Bangalore style)",
    price: 31.99,
    description: "Mandya style tender mutton slow-cooked in a spiced onion-tomato-based sauce",
    categoryId: 'main-course-non-veg',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Lamb Korma",
    price: 31.99,
    description: "Slow-cooked lamb in a rich, creamy cashew and yogurt gravy with aromatic Mughlai spices",
    categoryId: 'main-course-non-veg',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chicken Curry (Bangalore style)",
    price: 23.99,
    description: "Slow cooked bone in chicken in a spicy, pepperi karnataka style masala",
    categoryId: 'main-course-non-veg',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Plain Dosa",
    price: 12.99,
    description: "Crepe made with fermented rice and lentil batter",
    categoryId: 'dosa-specials',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Masala Dosa",
    price: 14.99,
    description: "Crepe with potato masala",
    categoryId: 'dosa-specials',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Benne Masala Dosa",
    price: 15.99,
    description: "Crispy crepe generously roasted in butter (benne) and filled with a spiced potato masala",
    categoryId: 'dosa-specials',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Ghee Open Masala Dosa",
    price: 16.99,
    description: "Open-style crispy dosa roasted in ghee, topped with spiced potato masala",
    categoryId: 'dosa-specials',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Mysore Masala Dosa",
    price: 15.99,
    description: "Crepe smeared with mild spiced red chutney & potato masala",
    categoryId: 'dosa-specials',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Onion Mysore Masala Dosa",
    price: 16.99,
    description: "Crepe smeared with mild spiced red chutney & potato masala, and sprinkled with onion",
    categoryId: 'dosa-specials',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Set Dosa with Chicken Gravy",
    price: 28.99,
    description: "3 small soft, light, and spongy dosas served with chicken gravy",
    categoryId: 'dosa-specials',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Set Dosa with Mutton Gravy",
    price: 35.99,
    description: "3 small soft, light, and spongy dosas served with bone in mutton (Goat) gravy",
    categoryId: 'dosa-specials',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Cheese Dosa",
    price: 15.99,
    description: "Crepe sprinkled with grated cheese",
    categoryId: 'specialty-dosa',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Cheese Mysore Masala Dosa",
    price: 18.99,
    description: "Crepe smeared with mild spiced red chutney, sprinkled with cheese & stuffed with potato masala",
    categoryId: 'specialty-dosa',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Paneer Mysore Masala Dosa",
    price: 18.99,
    description: "Crepe sprinkled with grated paneer and smeared with red chutney and stuffed with potato masala",
    categoryId: 'specialty-dosa',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chocolate Dosa",
    price: 13.99,
    description: "Crispy crepe smeared with Nutella",
    categoryId: 'specialty-dosa',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Onion Chilli Uttapam",
    price: 15.99,
    description: "Thick crepe sprinkled and roasted with finely chopped onion, green chilli & cilantro",
    categoryId: 'uttapam-special',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Tomato Onion Uttapam",
    price: 16.99,
    description: "Thick crepe sprinkled and roasted with finely chopped onion and topped with tomato & cilantro",
    categoryId: 'uttapam-special',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Tomato Onion Chilli Uttapam",
    price: 17.99,
    description: "Thick crepe sprinkled and roasted with finely chopped onion, chilli and topped with tomato & cilantro",
    categoryId: 'uttapam-special',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Plain Rava Dosa",
    price: 14.99,
    description: "Crisp crepe made with semolina",
    categoryId: 'rava-dosa-specials',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Onion Rava Dosa",
    price: 15.99,
    description: "Crisp crepe made with semolina sprinkled and roasted with finely chopped onions and cilantro",
    categoryId: 'rava-dosa-specials',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Onion Rava Masala Dosa",
    price: 18.99,
    description: "Crisp crepe made with semolina, sprinkled and roasted with finely chopped onions, cilantro, and mild-spiced potato masala",
    categoryId: 'rava-dosa-specials',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Idli",
    price: 13.99,
    description: "Steamed rice cake, 3 pieces",
    categoryId: 'idli-vada',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Idli in Sambar",
    price: 11.99,
    description: "Soft steamed idlis soaked in a flavorful, spiced lentil sambar, 2 pieces",
    categoryId: 'idli-vada',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Medu Vada",
    price: 11.99,
    description: "Crisp and fried doughnut made from black grams, 2 pieces",
    categoryId: 'idli-vada',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Vada in Sambar",
    price: 10.99,
    description: "Crisp and fried doughnut soaked in a flavorful, spiced lentil sambar, 1 piece",
    categoryId: 'idli-vada',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Idli/Vada Combo",
    price: 13.99,
    description: "2 idlis & 1 medu vada",
    categoryId: 'idli-vada',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Thatte Idli with Ghee Pudi",
    price: 10.99,
    description: "Soft, plate-sized thatte idli topped with aromatic ghee and spicy podi",
    categoryId: 'idli-vada',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Idli with Chicken Gravy",
    price: 28.99,
    description: "3 pieces",
    categoryId: 'idli-vada',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Idli with Mutton Gravy",
    price: 35.99,
    description: "3 pieces Idli served with bone in Mutton (Goat) gravy",
    categoryId: 'idli-vada',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Tiffin 1 - Mini Masala Dosa, Idli & Vada",
    price: 17.99,
    description: "A combination of one steamed rice cake, one lentil doughnut & mini masala dosa",
    categoryId: 'mini-tiffin',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Tiffin 2 - Mini Masala Dosa, Idli, Vada, Upma & Kesaribath",
    price: 22.99,
    description: "Combination of one, idli, lentil doughnut, mini masala dosa, upma & sweet (kesaribath)",
    categoryId: 'mini-tiffin',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Gobi Manchurian Gravy",
    price: 19.99,
    description: "Crispy cauliflower florets tossed in a flavorful Indo-Chinese garlic chili sauce",
    categoryId: 'indo-chinese-veg-gravy',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chili Paneer Gravy",
    price: 22.99,
    description: "Soft paneer cubes cooked in a spicy soy, garlic, and chili gravy with bell peppers and onions",
    categoryId: 'indo-chinese-veg-gravy',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chicken Manchurian Gravy",
    price: 22.99,
    description: "Juicy chicken dumplings simmered in a savory garlic, soy, and chili sauce",
    categoryId: 'indo-chinese-non-veg-gravy',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Veg Fried Rice",
    price: 19.99,
    description: "Wok-tossed rice with fresh vegetables, garlic, and light soy seasoning",
    categoryId: 'veg-noodles-rice',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Veg Schezuan Rice",
    price: 19.99,
    description: "Flavorful fried rice with vegetables in a bold and spicy Szechuan sauce",
    categoryId: 'veg-noodles-rice',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Veg Schezuan Noodles",
    price: 19.99,
    description: "Stir-fried noodles with vegetables in a spicy and tangy Szechuan sauce",
    categoryId: 'veg-noodles-rice',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Veg Hakka Noodles",
    price: 19.99,
    description: "Classic Indo-Chinese noodles stir-fried with vegetables and savory sauces",
    categoryId: 'veg-noodles-rice',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chicken Fried Rice",
    price: 21.99,
    description: "Wok-fried rice with tender chicken, egg, vegetables, and savory soy flavors",
    categoryId: 'non-veg-noodles-rice',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chicken Schezwan Rice",
    price: 21.99,
    description: "Fried rice with chicken, egg, cooked in a bold and spicy Szechuan sauce",
    categoryId: 'non-veg-noodles-rice',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chicken Schezwan Noodles",
    price: 21.99,
    description: "Noodles tossed with chicken in a spicy and flavorful Schezwan sauce",
    categoryId: 'non-veg-noodles-rice',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chicken Hakka Noodles",
    price: 21.99,
    description: "Stir-fried noodles with chicken, vegetables, and classic Hakka-style seasoning",
    categoryId: 'non-veg-noodles-rice',
    isVegetarian: false,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Veg Biryani",
    price: 19.99,
    description: "Fragrant rice cooked with marinated vegetables",
    categoryId: 'biryani',
    isVegetarian: true,
    isJain: false,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Chef Special Chicken 65 Biryani",
    price: 24.99,
    description: "Fragrant biryani layered with crispy, spicy Chicken 65, tossed in bold South Indian flavors—rich, fiery, and chef's signature twist",
    categoryId: 'biryani',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Bangalore Mutton Donne Biryani",
    price: 33.99,
    description: "Fragrant short-grain rice cooked with tender mutton, fresh herbs, and a signature green masala",
    categoryId: 'biryani',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Steamed Rice",
    price: 7.99,
    description: "Fluffy basmati rice",
    categoryId: 'rice',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Jeera Rice",
    price: 9.99,
    description: "Rice cooked with cumin seeds",
    categoryId: 'rice',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Bisibele Bath",
    price: 12.99,
    description: "Rice, lentils and vegetables in a spiced Karnataka style blend",
    categoryId: 'rice',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Chapati",
    price: 3.5,
    description: "Soft whole wheat flatbread served fresh and warm",
    categoryId: 'breads',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Butter Roti",
    price: 5,
    description: "Whole wheat bread cooked in a clay oven and smeared with butter",
    categoryId: 'breads',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Laccha Paratha",
    price: 6,
    description: "Flaky, layered flatbreads with optional savory fillings",
    categoryId: 'breads',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Garlic Naan",
    price: 6,
    description: "Soft Indian bread topped with garlic and butter",
    categoryId: 'breads',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Garlic Chilli Naan",
    price: 7,
    description: "Flavorful twist on traditional naan, infused with garlic butter and spicy chilies for an extra kick",
    categoryId: 'breads',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Cheese Naan",
    price: 7,
    description: "Soft, oven-baked naan stuffed with melted cheese",
    categoryId: 'breads',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Ice Cream",
    price: 6.99,
    description: "Vanilla, mango, strawberry, pista",
    categoryId: 'dessert',
    isVegetarian: true,
    isJain: false,
    imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Gulab Jamun",
    price: 7.99,
    description: "Fried dumplings soaked in sugar syrup",
    categoryId: 'dessert',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Rasmalai",
    price: 7.99,
    description: "Cottage cheese patties soaked in saffron-flavored milk",
    categoryId: 'dessert',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Gajar Halwa",
    price: 8.99,
    description: "Carrot pudding cooked with milk and nuts",
    categoryId: 'dessert',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Moong Dal Halwa",
    price: 8.99,
    description: "Slow-cooked moong lentils in ghee, delicately sweetened and flavored with cardamom",
    categoryId: 'dessert',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Payasa",
    price: 8.99,
    description: "Traditional South Indian dessert made with milk, jaggery, and vermicelli or lentils",
    categoryId: 'dessert',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Filter Coffee",
    price: 5.99,
    description: "Traditional South Indian filter coffee is brewed strongly and served with hot milk and rich foam",
    categoryId: 'beverages',
    isVegetarian: true,
    isJain: false,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Masala Chai",
    price: 3.99,
    description: "Traditional Indian milk tea brewed with aromatic spices and fresh ginger",
    categoryId: 'beverages',
    isVegetarian: true,
    isJain: false,
    imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: "Mango Lassi",
    price: 7.99,
    description: "Creamy yogurt smoothie blended with sweet ripe mangoes",
    categoryId: 'beverages',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Rose Milk",
    price: 5.99,
    description: "Chilled milk infused with fragrant rose syrup, served refreshing and lightly sweet",
    categoryId: 'beverages',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Badam Milk",
    price: 5.99,
    description: "Traditional Indian almond-based drink made with milk, ground almonds, sugar, and aromatic spices like cardamom and saffron",
    categoryId: 'beverages',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Buttermilk",
    price: 4.99,
    description: "Refreshing yogurt-based drink blended with water, cilantro, and a hint of salt",
    categoryId: 'beverages',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Soda",
    price: 2.99,
    description: "Coke, diet coke, coke zero, sunkist, ginger ale",
    categoryId: 'beverages',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Bottled Water",
    price: 4.99,
    description: "",
    categoryId: 'beverages',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  },
  {
    name: "Sparkling Water",
    price: 4.99,
    description: "",
    categoryId: 'beverages',
    isVegetarian: true,
    isJain: false,
    imageUrl: ''
  }
];

export async function syncReferenceMenu(): Promise<SyncSummary> {
  const logs: SyncLog[] = [];
  const nowStr = new Date().toLocaleTimeString();

  let addedCount = 0;
  let updatedCount = 0;
  let unchangedCount = 0;
  let imagesAddedCount = 0;
  let imagesReplacedCount = 0;
  let disabledCount = 0;
  let errorCount = 0;

  try {
    // 1. Sync Categories
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const existingCatDocs = categoriesSnapshot.docs;
    const existingCatMap = new Map<string, any>();
    
    existingCatDocs.forEach(d => {
      const data = d.data();
      const normName = normalizeMenuName(data.name || '');
      existingCatMap.set(normName, { id: d.id, ...data });
      if (data.id) existingCatMap.set(data.id, { id: d.id, ...data });
    });

    for (const cat of REFERENCE_CATEGORIES) {
      const normName = normalizeMenuName(cat.name);
      const existing = existingCatMap.get(normName) || existingCatMap.get(cat.id);

      if (existing) {
        await updateDoc(doc(db, 'categories', existing.id), {
          name: cat.name,
          order: cat.order,
          isActive: true,
          updatedAt: serverTimestamp()
        });
      } else {
        await setDoc(doc(db, 'categories', cat.id), {
          name: cat.name,
          order: cat.order,
          isActive: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    }

    // 2. Fetch existing menu items
    const menuSnapshot = await getDocs(collection(db, 'menuItems'));
    const existingItems: any[] = menuSnapshot.docs.map(d => ({ docId: d.id, ...d.data() }));
    const existingItemNormMap = new Map<string, any>();
    
    existingItems.forEach(item => {
      const normName = normalizeMenuName(item.name || '');
      existingItemNormMap.set(normName, item);
    });

    const refNormNames = new Set<string>();

    // 3. Process Reference Items
    for (const refItem of REFERENCE_MENU_ITEMS) {
      const normName = normalizeMenuName(refItem.name);
      refNormNames.add(normName);
      const existing = existingItemNormMap.get(normName);

      const targetImageUrl = getDishImageUrl(refItem.name);

      if (existing) {
        // Check if anything changed
        const needsUpdate = 
          existing.price !== refItem.price ||
          existing.description !== refItem.description ||
          existing.categoryId !== refItem.categoryId ||
          existing.isVegetarian !== refItem.isVegetarian ||
          existing.isAvailable === false ||
          !existing.imageUrl ||
          existing.imageUrl !== targetImageUrl;

        const hadImage = !!existing.imageUrl;

        if (needsUpdate) {
          const newImageUrl = targetImageUrl || refItem.imageUrl || existing.imageUrl;
          await updateDoc(doc(db, 'menuItems', existing.docId), {
            name: refItem.name,
            price: refItem.price,
            description: refItem.description,
            categoryId: refItem.categoryId,
            isVegetarian: refItem.isVegetarian,
            isJain: refItem.isJain ?? false,
            isAvailable: true,
            imageUrl: newImageUrl,
            updatedAt: serverTimestamp()
          });

          updatedCount++;
          if (!hadImage && newImageUrl) imagesAddedCount++;
          else if (hadImage && existing.imageUrl !== newImageUrl) imagesReplacedCount++;

          logs.push({
            timestamp: nowStr,
            itemName: refItem.name,
            action: 'updated',
            details: `Updated price ($${refItem.price}), image & details.`
          });
        } else {
          unchangedCount++;
          logs.push({
            timestamp: nowStr,
            itemName: refItem.name,
            action: 'unchanged',
            details: `Product already up-to-date.`
          });
        }
      } else {
        // Add new item (Case C)
        await addDoc(collection(db, 'menuItems'), {
          name: refItem.name,
          price: refItem.price,
          description: refItem.description,
          categoryId: refItem.categoryId,
          isVegetarian: refItem.isVegetarian,
          isJain: refItem.isJain ?? false,
          isAvailable: true,
          imageUrl: targetImageUrl || refItem.imageUrl,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        addedCount++;
        if (refItem.imageUrl) imagesAddedCount++;

        logs.push({
          timestamp: nowStr,
          itemName: refItem.name,
          action: 'added',
          details: `Added new reference product in $${refItem.price}.`
        });
      }
    }

    // 4. Disable items in Firestore not in reference menu (Case D)
    for (const item of existingItems) {
      const normName = normalizeMenuName(item.name || '');
      if (!refNormNames.has(normName) && item.isAvailable !== false) {
        await updateDoc(doc(db, 'menuItems', item.docId), {
          isAvailable: false,
          updatedAt: serverTimestamp()
        });
        disabledCount++;
        logs.push({
          timestamp: nowStr,
          itemName: item.name || 'Unknown item',
          action: 'disabled',
          details: `Disabled non-reference / legacy dish.`
        });
      }
    }

    return {
      referenceCount: REFERENCE_MENU_ITEMS.length,
      existingCount: existingItems.length,
      addedCount,
      updatedCount,
      unchangedCount,
      imagesAddedCount,
      imagesReplacedCount,
      disabledCount,
      errorCount,
      logs
    };
  } catch (err: any) {
    console.error("Error during reference menu sync:", err);
    logs.push({
      timestamp: nowStr,
      itemName: 'Sync Engine',
      action: 'error',
      details: err?.message || 'Sync operation failed'
    });
    return {
      referenceCount: REFERENCE_MENU_ITEMS.length,
      existingCount: 0,
      addedCount,
      updatedCount,
      unchangedCount,
      imagesAddedCount,
      imagesReplacedCount,
      disabledCount,
      errorCount: errorCount + 1,
      logs
    };
  }
}

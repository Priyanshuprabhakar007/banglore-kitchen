import fs from 'fs';
import path from 'path';

const imageDir = path.join(process.cwd(), 'banglore kitchen menu images');
const localFiles = fs.readdirSync(imageDir).filter(f => f.endsWith('.webp'));
const menuItems = JSON.parse(fs.readFileSync('./scratch/firebase_menu_items.json', 'utf-8'));

function norm(s) {
  return (s || '')
    .toLowerCase()
    .replace(/^(\d{3}-)/, '')
    .replace(/\.webp$/, '')
    .replace(/^authentic\s+/gi, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// 1. Direct high-confidence mapping table
// Maps normalized local filename -> Firestore dish name
const KNOWN_MAP = {
  "masala papad": "Masala Papad", // 001-masala-papad.webp
  "samosa": "Samosa", // 002
  "onion pakoda": "Onion Pakoda", // 003
  "gobi manchurian": "Gobi Manchurian", // 004
  "chilli paneer": "Chilli Paneer", // 005
  "chilly crispy baby corn": "Chilly Crispy Baby Corn", // 006
  "masala peanut": "Masala Peanut", // 007
  "masala puri": "Masala Puri", // 008
  "palak chaat": "Palak Chaat", // 009
  "veg momos": "Veg Momos", // 010
  "chicken momos": "Chicken Momos", // 011
  "chilli chicken": "Chilli Chicken", // 012
  "chicken 65": "Chicken 65", // 013
  "chicken lollipop": "Chicken Lollipop", // 014
  "prawn pepper fry": "Prawn Pepper Fry", // 015
  "fish fry golden pompano": "Fish Fry (Golden Pompano)", // 016
  "hyderabadi goat sukka": "Hyderabadi Goat Sukka", // 017
  "rasam soup": "Rasam Soup", // 018
  "sweet corn soup": "Sweet Corn Soup", // 019
  "veg hot and sour soup": "Veg Hot and Sour Soup", // 020
  "goat paya soup": "Goat Paya Soup", // 022
  "tandoori chicken half": "Tandoori Chicken Half", // 023
  "tandoor paneer tikka grill": "Tandoor Paneer Tikka Grill", // 024
  "tandoori chicken full": "Tandoori Chicken Full", // 025
  "pappu nagarjuna style": "Pappu (Nagarjuna style)", // 026
  "chana masala": "Chana Masala", // 027
  "bhagara baingan": "Bhagara Baingan", // 028
  "bhindi masala": "Bhindi Masala", // 029
  "paneer butter masala": "Paneer Butter Masala", // 030
  "saag paneer": "Saag Paneer", // 031
  "navaratan vegetable korma": "Navaratan Vegetable Korma", // 032
  "egg curry": "Egg Curry", // 033
  "butter chicken": "Butter Chicken", // 034
  "chicken tikka masala": "Chicken Tikka Masala", // 035
  "mangalore fish curry": "Mangalore Fish Curry", // 036
  "cochin prawn shrimp curry": "Cochin Prawn/Shrimp Curry", // 037
  "mutton curry bangalore style": "Mutton curry (Bangalore style)", // 038
  "lamb korma": "Lamb Korma", // 039
  "chicken curry bangalore style": "Chicken Curry (Bangalore style)", // 040
  "chicken fried rice": "Chicken Fried Rice", // 047
  "veg biryani": "Veg Biryani", // 056
  "veg fried rice": "Veg Fried Rice", // 057
  "jeera rice": "Jeera Rice", // 063
  "garlic naan": "Garlic Naan", // 073
  "cheese naan": "Cheese Naan", // 074
  "lachha paratha": "Laccha Paratha" // 075
};

// Potential review candidates:
const REVIEW_CANDIDATES = {
  "044-veg-noodles.webp": "Veg Hakka Noodles",
  "045-chicken-noodles.webp": "Chicken Hakka Noodles",
  "052-chicken-biryani.webp": "Chef Special Chicken 65 Biryani",
  "054-goat-biryani.webp": "Bangalore Mutton Donne Biryani"
};

// Evaluate each local image
const imageResults = [];
const usedDishIds = new Set();
const dishToImage = new Map();

localFiles.forEach(file => {
  const n = norm(file);
  
  // Special handling for duplicates like 099-masala-papad-1, 100-masala-papad
  if (file === '099-masala-papad-1.webp' || file === '100-masala-papad.webp') {
    imageResults.push({
      file,
      status: 'EXTRA_LOCAL_IMAGE',
      reason: 'Duplicate/Variant of Masala Papad (001-masala-papad already assigned)'
    });
    return;
  }

  // Check known map
  if (KNOWN_MAP[n]) {
    const targetName = KNOWN_MAP[n];
    const dish = menuItems.find(d => d.name === targetName);
    if (dish) {
      usedDishIds.add(dish.id);
      dishToImage.set(dish.id, file);
      imageResults.push({
        file,
        status: 'MATCHED',
        dishId: dish.id,
        dishName: dish.name,
        category: dish.categoryId
      });
      return;
    }
  }

  // Check review candidates
  if (REVIEW_CANDIDATES[file]) {
    const candidateName = REVIEW_CANDIDATES[file];
    const dish = menuItems.find(d => d.name === candidateName);
    imageResults.push({
      file,
      status: 'NEEDS_REVIEW',
      suggestedDishId: dish ? dish.id : null,
      suggestedDishName: candidateName,
      reason: `Ambiguous match: local filename "${file}" vs menu item "${candidateName}"`
    });
    return;
  }

  // Otherwise it is an extra local image not in current menu
  imageResults.push({
    file,
    status: 'EXTRA_LOCAL_IMAGE',
    reason: 'Dish not present in live Firestore menu'
  });
});

// Evaluate menu items
const menuItemResults = menuItems.map(dish => {
  if (dishToImage.has(dish.id)) {
    return {
      dishId: dish.id,
      dishName: dish.name,
      category: dish.categoryId,
      status: 'MATCHED',
      matchedFile: dishToImage.get(dish.id)
    };
  }
  
  // Check if a review candidate targets this dish
  const reviewMatch = Object.entries(REVIEW_CANDIDATES).find(([f, dName]) => dName === dish.name);
  if (reviewMatch) {
    return {
      dishId: dish.id,
      dishName: dish.name,
      category: dish.categoryId,
      status: 'NEEDS_REVIEW',
      suggestedFile: reviewMatch[0],
      reason: `Potential candidate ${reviewMatch[0]} needs review`
    };
  }

  // Check if there is an existing verified image in public/images/dishes or public/images/ai-menu
  let existingAiAsset = null;
  if (dish.imageUrl && dish.imageUrl.startsWith('/images/ai-menu/')) {
    existingAiAsset = dish.imageUrl;
  }

  return {
    dishId: dish.id,
    dishName: dish.name,
    category: dish.categoryId,
    status: 'IMAGE_MISSING',
    existingImageUrl: dish.imageUrl || '',
    existingAiAsset
  };
});

const stats = {
  totalLocalImages: localFiles.length,
  totalFirestoreItems: menuItems.length,
  matchedImages: imageResults.filter(i => i.status === 'MATCHED').length,
  needsReviewImages: imageResults.filter(i => i.status === 'NEEDS_REVIEW').length,
  extraLocalImages: imageResults.filter(i => i.status === 'EXTRA_LOCAL_IMAGE').length,
  menuItemsMatched: menuItemResults.filter(m => m.status === 'MATCHED').length,
  menuItemsNeedsReview: menuItemResults.filter(m => m.status === 'NEEDS_REVIEW').length,
  menuItemsMissing: menuItemResults.filter(m => m.status === 'IMAGE_MISSING').length
};

console.log('--- AUDIT STATISTICS ---');
console.log(JSON.stringify(stats, null, 2));

fs.writeFileSync('./scratch/comprehensive_audit.json', JSON.stringify({
  stats,
  imageResults,
  menuItemResults
}, null, 2));

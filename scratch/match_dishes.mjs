import fs from 'fs';
import path from 'path';

const imageDir = path.join(process.cwd(), 'banglore kitchen menu images');
const imageFiles = fs.readdirSync(imageDir).filter(f => f.endsWith('.webp'));

const menuItems = JSON.parse(fs.readFileSync('./scratch/firebase_menu_items.json', 'utf-8'));

function normalize(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/^(\d{3}-)/, '') // strip leading 001-
    .replace(/\.webp$/, '')
    .replace(/^authentic\s+/gi, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

console.log(`Local images count: ${imageFiles.length}`);
console.log(`Firestore dishes count: ${menuItems.length}`);

// Build parsed local image records
const localImages = imageFiles.map(filename => {
  const numMatch = filename.match(/^(\d{3})-(.+)\.webp$/);
  const number = numMatch ? numMatch[1] : '';
  const rawBase = numMatch ? numMatch[2] : filename.replace(/\.webp$/, '');
  const cleanNorm = normalize(filename);
  return {
    filename,
    number,
    rawBase,
    cleanNorm,
    filePath: path.join(imageDir, filename)
  };
});

// Let's test matching against menuItems
const matches = [];
const unmatchedMenuItems = [];
const usedLocalImages = new Set();

for (const dish of menuItems) {
  const dishNorm = normalize(dish.name);
  
  // Exact normalized match
  let found = localImages.find(img => img.cleanNorm === dishNorm && !usedLocalImages.has(img.filename));

  // If not found, try common synonyms/variants:
  // e.g. chilli vs chili, veggies vs veg, prawns vs prawn, etc.
  if (!found) {
    const dishSynonym = dishNorm
      .replace(/chilli|chilly/g, 'chili')
      .replace(/vegetable|vegetables/g, 'veg')
      .replace(/prawns/g, 'prawn')
      .replace(/shrimps/g, 'shrimp')
      .replace(/nagarjuna style/g, 'nagarjuna')
      .replace(/bangalore style/g, 'bangalore');

    found = localImages.find(img => {
      if (usedLocalImages.has(img.filename)) return false;
      const imgSynonym = img.cleanNorm
        .replace(/chilli|chilly/g, 'chili')
        .replace(/vegetable|vegetables/g, 'veg')
        .replace(/prawns/g, 'prawn')
        .replace(/shrimps/g, 'shrimp')
        .replace(/nagarjuna style/g, 'nagarjuna')
        .replace(/bangalore style/g, 'bangalore');
      return imgSynonym === dishSynonym;
    });
  }

  if (found) {
    usedLocalImages.add(found.filename);
    matches.push({
      dishId: dish.id,
      dishName: dish.name,
      category: dish.categoryId || dish.category,
      description: dish.description || '',
      currentImageUrl: dish.imageUrl || '',
      matchedImageFile: found.filename,
      matchType: 'EXACT_OR_SYNONYM',
      confidence: 'HIGH'
    });
  } else {
    unmatchedMenuItems.push(dish);
  }
}

const unusedLocalImages = localImages.filter(img => !usedLocalImages.has(img.filename));

console.log(`\nMatched dishes count: ${matches.length}`);
console.log(`Unmatched menu items count: ${unmatchedMenuItems.length}`);
console.log(`Unused local images count: ${unusedLocalImages.length}`);

console.log('\n--- Unmatched Menu Items ---');
unmatchedMenuItems.forEach(d => console.log(`[${d.id}] "${d.name}" (${d.categoryId})`));

console.log('\n--- Unused Local Images ---');
unusedLocalImages.forEach(img => console.log(`[${img.number}] ${img.filename} -> "${img.cleanNorm}"`));

fs.writeFileSync('./scratch/initial_matching_analysis.json', JSON.stringify({
  matches,
  unmatchedMenuItems,
  unusedLocalImages
}, null, 2));

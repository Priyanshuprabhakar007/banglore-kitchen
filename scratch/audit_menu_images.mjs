import fs from 'fs';
import path from 'path';

const items = JSON.parse(fs.readFileSync('./scratch/firebase_menu_items.json', 'utf-8'));

// Read all files in public/images/dishes/
const dishesFiles = fs.readdirSync('./public/images/dishes');
// Read all files in public/images/menu/
const menuFiles = fs.existsSync('./public/images/menu') ? fs.readdirSync('./public/images/menu') : [];

// Find duplicate imageUrls across items
const urlCounts = {};
for (const item of items) {
  const url = item.imageUrl || '(empty)';
  urlCounts[url] = (urlCounts[url] || 0) + 1;
}

const duplicates = Object.entries(urlCounts).filter(([url, count]) => count > 1 && url !== '(empty)');

console.log(`=== AUDIT SUMMARY ===`);
console.log(`Total Menu Items: ${items.length}`);
console.log(`Unique Image URLs: ${Object.keys(urlCounts).length}`);
console.log(`Duplicate URLs used across multiple dishes: ${duplicates.length}`);

console.log('\n--- Duplicate URLs breakdown ---');
for (const [url, count] of duplicates) {
  const dishesWithThisUrl = items.filter(i => i.imageUrl === url).map(i => `${i.name} (${i.id})`);
  console.log(`URL [used ${count} times]: ${url.slice(0, 60)}...`);
  console.log(`  Dishes: ${dishesWithThisUrl.join(', ')}`);
}

// Generate complete mapping analysis
const auditRecords = [];
for (const item of items) {
  const name = item.name;
  const url = item.imageUrl || '';
  const isDuplicate = url && urlCounts[url] > 1;

  // Derive slug
  let slug = name.toLowerCase().trim()
    .replace(/^authentic\s+/gi, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim().replace(/\s+/g, '-').replace(/-+/g, '-');

  // Check if matching local files exist in dishes/
  const match1200 = `${slug}-1200.webp`;
  const match800 = `${slug}-800.webp`;
  const match480 = `${slug}-480.webp`;
  const hasLocalDish1200 = dishesFiles.includes(match1200);

  // Check if matching local files exist in menu/
  const menuSlug = slug.replace(/-/g, '_');
  const hasLocalMenuWebp = menuFiles.includes(`${menuSlug}.webp`);

  let localCandidate = null;
  if (hasLocalDish1200) {
    localCandidate = `/images/dishes/${match1200}`;
  } else if (hasLocalMenuWebp) {
    localCandidate = `/images/menu/${menuSlug}.webp`;
  }

  auditRecords.push({
    id: item.id,
    name: item.name,
    categoryId: item.categoryId,
    currentImageUrl: url,
    isDuplicateUrl: isDuplicate,
    duplicateCount: url ? urlCounts[url] : 0,
    hasLocalDishImage: hasLocalDish1200,
    localCandidate,
    price: item.price
  });
}

fs.writeFileSync('./scratch/audit_records.json', JSON.stringify(auditRecords, null, 2), 'utf-8');
console.log('\nSaved full audit records to ./scratch/audit_records.json');

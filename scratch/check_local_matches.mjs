import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./scratch/firebase_menu_items.json', 'utf-8'));
const dishesFiles = fs.readdirSync('./public/images/dishes');

let matchedCount = 0;
let missingCount = 0;
const matched = [];
const missing = [];

for (const item of items) {
  const name = item.name;
  let slug = name.toLowerCase().trim()
    .replace(/^authentic\s+/gi, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim().replace(/\s+/g, '-').replace(/-+/g, '-');

  const match1200 = `${slug}-1200.webp`;
  const match800 = `${slug}-800.webp`;
  const match480 = `${slug}-480.webp`;

  if (dishesFiles.includes(match1200)) {
    matchedCount++;
    matched.push({
      id: item.id,
      name: item.name,
      slug,
      file: match1200
    });
  } else {
    missingCount++;
    missing.push({
      id: item.id,
      name: item.name,
      slug
    });
  }
}

console.log(`Matched dishes with local webp files in dishes/: ${matchedCount} / ${items.length}`);
console.log(`Missing dishes without exact slug file: ${missingCount}`);
if (missing.length > 0) {
  console.log('Missing dishes:');
  missing.forEach(m => console.log(`  - ${m.name} (slug: ${m.slug})`));
}

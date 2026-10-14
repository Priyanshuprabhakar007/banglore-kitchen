import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./scratch/comprehensive_audit.json', 'utf-8'));
const missing = data.menuItemResults.filter(m => m.status === 'IMAGE_MISSING');

console.log(`Total missing items from new folder: ${missing.length}`);

const byCat = {};
missing.forEach(m => {
  byCat[m.category] = byCat[m.category] || [];
  byCat[m.category].push({
    id: m.dishId,
    name: m.dishName,
    existingImageUrl: m.existingImageUrl,
    existingAiAsset: m.existingAiAsset
  });
});

console.log('Categories of missing items:');
for (const [cat, items] of Object.entries(byCat)) {
  console.log(`\n=== Category: ${cat} (${items.length} items) ===`);
  items.forEach(it => {
    console.log(`  - [${it.id}] "${it.name}" (CurrImg: ${it.existingImageUrl || 'EMPTY'})`);
  });
}

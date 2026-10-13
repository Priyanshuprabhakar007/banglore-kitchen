import fs from 'fs';

const a = JSON.parse(fs.readFileSync('./scratch/complete_audit_results.json'));
const verified = a.filter(x => x.status === 'VERIFIED_UNIQUE_LOCAL_IMAGE' || x.status === 'VERIFIED_UNIQUE_MENU_IMAGE');

console.log(`Total Verified Unique Dishes: ${verified.length}`);

// Group by category
const byCat = {};
for (const v of verified) {
  if (!byCat[v.category]) byCat[v.category] = [];
  byCat[v.category].push(v);
}

for (const [cat, items] of Object.entries(byCat)) {
  console.log(`\n[Category: ${cat}] (${items.length} dishes):`);
  items.forEach(i => console.log(`  - ${i.name} (ID: ${i.dishId}) => ${i.proposedPath}`));
}

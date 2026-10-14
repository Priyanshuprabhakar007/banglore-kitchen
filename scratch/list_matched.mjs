import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./scratch/comprehensive_audit.json', 'utf-8'));
const matched = data.menuItemResults.filter(m => m.status === 'MATCHED');

console.log(`Matched dishes count: ${matched.length}`);
matched.forEach((m, idx) => {
  console.log(`${(idx+1).toString().padStart(2, '0')}. [${m.dishId}] "${m.dishName}" (${m.category}) <- ${m.matchedFile}`);
});

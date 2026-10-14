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

console.log('Comparing all 111 dishes with 114 local files...');
const localMap = new Map();
localFiles.forEach(f => {
  localMap.set(norm(f), f);
});

console.log('\nChecking exact normalized matches:');
let exactMatches = 0;
menuItems.forEach(d => {
  const dNorm = norm(d.name);
  if (localMap.has(dNorm)) {
    exactMatches++;
    console.log(`[MATCH] "${d.name}" -> ${localMap.get(dNorm)}`);
  }
});
console.log(`Total exact matches: ${exactMatches}`);

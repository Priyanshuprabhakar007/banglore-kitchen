import fs from 'fs';
const v = JSON.parse(fs.readFileSync('scratch/verified_map.json', 'utf8'));
console.log('Verified count:', Object.keys(v).length);
console.log('Sample verified:');
Object.entries(v).slice(0, 15).forEach(([id, file]) => console.log(`  ${id} -> ${file}`));

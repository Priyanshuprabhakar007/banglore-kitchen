import fs from 'fs';
const data = JSON.parse(fs.readFileSync('scratch/complete_audit_results.json', 'utf8'));
console.log('Keys:', Object.keys(data[0]));
console.log('First item:', data[0]);
const unv = data.filter(x => x.status !== 'VERIFIED_UNIQUE');
console.log(`Unresolved total: ${unv.length}`);
console.log('First 5 unresolved:', unv.slice(0, 5));

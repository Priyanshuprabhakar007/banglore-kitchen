import fs from 'fs';
import crypto from 'crypto';

const SAMSOSA_HASH = 'a9cb1bfbbd89b3612c8b0f5abd4219b2';
const CHICKEN65_HASH = '94196e54c14b7dd5f8faa25f13791527';
const PLAIN_DOSA_HASH = '6bf6785e08695bd394a5f3b012eb6aac';
const MYSORE_DOSA_HASH = '097aed74320b70d8fb8b4e88ea568111';

const data = JSON.parse(fs.readFileSync('scratch/complete_audit_results.json', 'utf8'));
const mismatched = data.filter(d => d.status !== 'VERIFIED_UNIQUE_LOCAL_IMAGE');

console.log('--- Status of the 46 Disputed Dishes ---');
let upgradedCount = 0;
let remainingCount = 0;

const upgraded = [];
const remaining = [];

for (const d of mismatched) {
  const filePath = `public/images/dishes/${d.localFile || d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-1200.webp'}`;
  if (fs.existsSync(filePath)) {
    const buf = fs.readFileSync(filePath);
    const hash = crypto.createHash('md5').update(buf).digest('hex');
    if (hash !== SAMSOSA_HASH && hash !== CHICKEN65_HASH && hash !== PLAIN_DOSA_HASH && hash !== MYSORE_DOSA_HASH) {
      upgradedCount++;
      upgraded.push({ id: d.dishId, name: d.name, file: filePath, size: buf.length, hash });
      continue;
    }
  }
  remainingCount++;
  remaining.push({ id: d.dishId, name: d.name, category: d.category, expected: d.expectedSubject });
}

console.log(`Upgraded so far: ${upgradedCount}`);
console.log(`Remaining to upgrade: ${remainingCount}`);
console.log('\nUpgraded List:');
upgraded.forEach((u, i) => console.log(`${i+1}. [${u.id}] ${u.name} -> ${u.file} (${Math.round(u.size/1024)} KB)`));
console.log('\nRemaining List:');
remaining.forEach((r, i) => console.log(`${i+1}. [${r.id}] ${r.name} (${r.category})`));

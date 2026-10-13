import fs from 'fs';
import crypto from 'crypto';

const all46Raw = fs.readFileSync('scratch/all_46.mjs', 'utf8');
const data = JSON.parse(fs.readFileSync('scratch/complete_audit_results.json', 'utf8'));
const mismatched = data.filter(d => d.status !== 'VERIFIED_UNIQUE_LOCAL_IMAGE');

console.log('--- Unresolved Items Detail ---');
for (const item of mismatched) {
  let fileExists = false;
  let fileSize = 0;
  if (item.localFile) {
    const fullPath = `public/images/dishes/${item.localFile}`;
    if (fs.existsSync(fullPath)) {
      fileExists = true;
      fileSize = fs.statSync(fullPath).size;
    }
  }
  console.log(`[${item.dishId}] ${item.name} (${item.category}): localFile=${item.localFile} (exists=${fileExists}, size=${fileSize} bytes)`);
}

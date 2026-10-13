import fs from 'fs';
const data = JSON.parse(fs.readFileSync('scratch/complete_audit_results.json', 'utf8'));
const mismatched = data.filter(d => d.status !== 'VERIFIED_UNIQUE_LOCAL_IMAGE');
console.log(`Total: ${mismatched.length}`);
mismatched.forEach((d, i) => {
  console.log(`${i+1}. [${d.dishId}] "${d.name}" (${d.category}) -> local: ${d.localFile}`);
});

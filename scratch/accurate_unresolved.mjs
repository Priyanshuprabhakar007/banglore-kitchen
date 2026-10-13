import fs from 'fs';
const data = JSON.parse(fs.readFileSync('scratch/complete_audit_results.json', 'utf8'));
const counts = {};
data.forEach(d => {
  counts[d.status] = (counts[d.status] || 0) + 1;
});
console.log('Status counts:', counts);

const mismatched = data.filter(d => d.status !== 'VERIFIED_UNIQUE_LOCAL_IMAGE');
console.log(`\nUnresolved items (${mismatched.length}):`);
mismatched.forEach((d, i) => {
  console.log(`${i+1}. [${d.dishId}] "${d.name}" | Cat: ${d.category} | Status: ${d.status} | Local: ${d.localFile} | Reason: ${d.reason}`);
});

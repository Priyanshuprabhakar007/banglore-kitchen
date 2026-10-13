import fs from 'fs';

const results = JSON.parse(fs.readFileSync('scratch/complete_audit_results.json', 'utf8'));
const unresolved = results.filter(r => r.status !== 'VERIFIED_UNIQUE');
console.log(`Unresolved count: ${unresolved.length}`);
unresolved.forEach((u, i) => {
  console.log(`${i+1}. [${u.id}] ${u.name} (${u.category}) -> local: ${u.localFile}, hash: ${u.hash}`);
});

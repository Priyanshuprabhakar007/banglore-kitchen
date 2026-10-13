import fs from 'fs';

const a = JSON.parse(fs.readFileSync('./scratch/complete_audit_results.json'));

console.log('=== 44 MISMATCHED DISHES WITH DUPLICATE LOCAL FILES ===');
const mismatched = a.filter(x => x.status === 'MISMATCH_DUPLICATE_LOCAL_IMAGE');
mismatched.forEach((x, i) => {
  console.log(`${(i+1).toString().padStart(2, ' ')}. [${x.category}] "${x.name}" (ID: ${x.dishId})`);
  console.log(`    Current Firebase URL: ${x.currentImageUrl}`);
  console.log(`    Local file: ${x.localFile}`);
  console.log(`    Actual visual subject: ${x.genericLocalDescription}`);
  console.log('');
});

console.log('=== 2 DISHES WITH REPEATED REMOTE URL AND NO LOCAL FILE ===');
const missing = a.filter(x => x.status === 'MISMATCH_REPEATED_REMOTE_URL');
missing.forEach((x, i) => {
  console.log(`${(i+1).toString().padStart(2, ' ')}. [${x.category}] "${x.name}" (ID: ${x.dishId})`);
  console.log(`    Current Firebase URL: ${x.currentImageUrl}`);
  console.log('');
});

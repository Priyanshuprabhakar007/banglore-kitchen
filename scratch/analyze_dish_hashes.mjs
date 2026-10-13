import fs from 'fs';
import crypto from 'crypto';

const dishesDir = './public/images/dishes';
const files = fs.readdirSync(dishesDir).filter(f => f.endsWith('-1200.webp'));

const hashGroups = {};
for (const file of files) {
  const filePath = `${dishesDir}/${file}`;
  const buf = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5').update(buf).digest('hex');
  if (!hashGroups[hash]) {
    hashGroups[hash] = [];
  }
  hashGroups[hash].push(file);
}

console.log(`Total 1200.webp files: ${files.length}`);
console.log(`Unique image contents (unique MD5 hashes): ${Object.keys(hashGroups).length}`);

const sortedHashes = Object.entries(hashGroups).sort((a, b) => b[1].length - a[1].length);

for (const [hash, fileList] of sortedHashes) {
  console.log(`\nHash ${hash.slice(0, 8)}... (${fileList.length} files):`);
  console.log(`  Sample files: ${fileList.slice(0, 5).join(', ')}${fileList.length > 5 ? ' ...and ' + (fileList.length - 5) + ' more' : ''}`);
}

fs.writeFileSync('./scratch/local_dishes_hash_analysis.json', JSON.stringify(sortedHashes, null, 2), 'utf-8');

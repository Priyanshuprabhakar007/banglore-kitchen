import fs from 'fs';
import crypto from 'crypto';

const mapping = JSON.parse(fs.readFileSync('scratch/all_111_verified_mapping.json', 'utf8'));

const hashes = {};
const duplicates = [];

for (const [name, path] of Object.entries(mapping)) {
  const fullPath = `public${path}`;
  if (!fs.existsSync(fullPath)) {
    console.error(`File missing: ${fullPath}`);
    continue;
  }
  const buf = fs.readFileSync(fullPath);
  const hash = crypto.createHash('md5').update(buf).digest('hex');
  if (hashes[hash]) {
    duplicates.push({ name1: hashes[hash].name, name2: name, path1: hashes[hash].path, path2: path, hash });
  } else {
    hashes[hash] = { name, path };
  }
}

console.log(`Unique image files: ${Object.keys(hashes).length}`);
console.log(`Duplicate hash pairs: ${duplicates.length}`);
if (duplicates.length > 0) {
  duplicates.forEach(d => console.log(`Duplicate: "${d.name1}" & "${d.name2}" -> ${d.path1} == ${d.path2}`));
}

import fs from 'fs';

const items = JSON.parse(fs.readFileSync('scratch/firebase_menu_items.json', 'utf8'));

console.log(`Auditing all ${items.length} items against local files...`);

const mapping = {};
const missing = [];

for (const item of items) {
  const clean = item.name.toLowerCase().trim()
    .replace(/^authentic\s+/gi, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const possiblePaths = [
    `public/images/dishes/${clean}-1200.webp`,
    `public/images/dishes/${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-1200.webp`
  ];

  let found = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      found = p.replace('public', '');
      break;
    }
  }

  // Handle known naming variations if any
  if (!found) {
    // Check files
    const allFiles = fs.readdirSync('public/images/dishes');
    const match = allFiles.find(f => f.startsWith(clean.substring(0, 10)) && f.endsWith('-1200.webp'));
    if (match) {
      found = `/images/dishes/${match}`;
    }
  }

  if (found) {
    mapping[item.name] = found;
  } else {
    missing.push(item.name);
  }
}

console.log(`Mapped count: ${Object.keys(mapping).length} / ${items.length}`);
console.log(`Missing count: ${missing.length}`);
if (missing.length > 0) {
  console.log('Missing items:', missing);
}

fs.writeFileSync('scratch/all_111_verified_mapping.json', JSON.stringify(mapping, null, 2));

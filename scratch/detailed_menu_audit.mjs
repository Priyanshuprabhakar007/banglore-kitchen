import fs from 'fs';
import crypto from 'crypto';

const items = JSON.parse(fs.readFileSync('./scratch/firebase_menu_items.json', 'utf-8'));
const dishesDir = './public/images/dishes';
const menuDir = './public/images/menu';

const dishesFiles = fs.readdirSync(dishesDir);
const menuFiles = fs.existsSync(menuDir) ? fs.readdirSync(menuDir) : [];

// Compute hashes for all 1200.webp in dishes/
const fileHashes = {};
for (const f of dishesFiles.filter(x => x.endsWith('-1200.webp'))) {
  const buf = fs.readFileSync(`${dishesDir}/${f}`);
  const hash = crypto.createHash('md5').update(buf).digest('hex');
  fileHashes[f] = hash;
}

// Exact 32-character MD5 hashes of repeated generic placeholder files in dishes/
const GENERIC_HASHES = {
  'a9cb1bfbbd89b3612c8b0f5abd4219b2': 'Samosas Photo (Duplicated across 27 dishes)',
  '94196e54c14b7dd5f8faa25f13791527': 'Chicken 65 Photo (Duplicated across 13 dishes)',
  '6bf6785e08695bd394a5f3b012eb6aac': 'Plain Dosa Photo (Duplicated across 6 dishes)',
  '097aed74320b70d8fb8b4e88ea568111': 'Mysore Masala Dosa Photo (Duplicated across 2 dishes)'
};

// Count remote URL frequencies in Firestore
const urlFreq = {};
for (const i of items) {
  const u = i.imageUrl || '';
  if (u) urlFreq[u] = (urlFreq[u] || 0) + 1;
}

const audit = [];

for (const item of items) {
  const name = item.name;
  const currentUrl = item.imageUrl || '';
  const isDuplicateRemote = currentUrl && urlFreq[currentUrl] > 1;

  let slug = name.toLowerCase().trim()
    .replace(/^authentic\s+/gi, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim().replace(/\s+/g, '-').replace(/-+/g, '-');

  const file1200 = `${slug}-1200.webp`;
  const file800 = `${slug}-800.webp`;
  const file480 = `${slug}-480.webp`;

  const hasLocalDish = dishesFiles.includes(file1200);
  const hash = hasLocalDish ? fileHashes[file1200] : null;
  const isGenericLocal = hash && GENERIC_HASHES[hash] ? GENERIC_HASHES[hash] : null;

  // Check if this dish is the true subject of the generic hash
  let isTrueOriginalOfGeneric = false;
  if (hash === 'a9cb1bfbbd89b3612c8b0f5abd4219b2' && slug === 'samosa') isTrueOriginalOfGeneric = true;
  if (hash === '94196e54c14b7dd5f8faa25f13791527' && slug === 'chicken-65') isTrueOriginalOfGeneric = true;
  if (hash === '6bf6785e08695bd394a5f3b012eb6aac' && slug === 'plain-dosa') isTrueOriginalOfGeneric = true;
  if (hash === '097aed74320b70d8fb8b4e88ea568111' && slug === 'mysore-masala-dosa') isTrueOriginalOfGeneric = true;

  // Check menu/ directory for dedicated webp
  const menuSlug = slug.replace(/-/g, '_') + '.webp';
  const hasLocalMenu = menuFiles.includes(menuSlug);

  // Status calculation
  let status = 'UNKNOWN';
  let proposedPath = null;
  let reason = '';

  const hasValidUniqueLocalDish = hasLocalDish && (!isGenericLocal || isTrueOriginalOfGeneric);

  if (hasValidUniqueLocalDish) {
    status = 'VERIFIED_UNIQUE_LOCAL_IMAGE';
    proposedPath = `/images/dishes/${file1200}`;
    reason = `Verified dedicated local photography exists (${file1200}).`;
  } else if (hasLocalMenu) {
    status = 'VERIFIED_UNIQUE_MENU_IMAGE';
    proposedPath = `/images/menu/${menuSlug}`;
    reason = `Verified unique webp in /images/menu/${menuSlug}.`;
  } else if (isGenericLocal && !isTrueOriginalOfGeneric) {
    status = 'MISMATCH_DUPLICATE_LOCAL_IMAGE';
    proposedPath = null;
    reason = `Local file (${file1200}) is a false duplicate containing: ${isGenericLocal}. Remote URL in DB is also a shared duplicate (used ${urlFreq[currentUrl]}x). Requires dedicated photo in Phase 2.`;
  } else if (isDuplicateRemote) {
    status = 'MISMATCH_REPEATED_REMOTE_URL';
    proposedPath = null;
    reason = `Current DB URL is shared across ${urlFreq[currentUrl]} different dishes without an accurate local file.`;
  } else if (!currentUrl) {
    status = 'MISSING_IMAGE';
    proposedPath = null;
    reason = 'No image URL in Firestore and no local dish file.';
  } else {
    status = 'REMOTE_IMAGE_UNVERIFIED';
    proposedPath = currentUrl;
    reason = 'Current remote URL is unique in DB, but no local asset exists.';
  }

  audit.push({
    dishId: item.id,
    name: item.name,
    category: item.categoryId,
    price: item.price,
    currentImageUrl: currentUrl,
    expectedSubject: item.name,
    isDuplicateRemote,
    remoteDuplicateCount: currentUrl ? urlFreq[currentUrl] : 0,
    hasLocalDishFile: hasLocalDish,
    localFile: hasLocalDish ? file1200 : null,
    isGenericLocalFile: !!isGenericLocal && !isTrueOriginalOfGeneric,
    genericLocalDescription: isGenericLocal,
    status,
    proposedPath,
    reason
  });
}

const statusCounts = {};
for (const a of audit) {
  statusCounts[a.status] = (statusCounts[a.status] || 0) + 1;
}

console.log('=== ACCURATE AUDIT BREAKDOWN ===');
console.log(statusCounts);

fs.writeFileSync('./scratch/complete_audit_results.json', JSON.stringify(audit, null, 2), 'utf-8');
console.log('Saved to ./scratch/complete_audit_results.json');

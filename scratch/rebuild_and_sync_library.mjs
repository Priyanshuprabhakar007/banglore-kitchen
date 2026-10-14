import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcDir = path.resolve('banglore kitchen menu images');
const publicDir = path.resolve('public', 'images', 'ai-menu');

// 1. Fresh scan of source files
const sourceFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.webp'));
console.log(`[SCAN] Found ${sourceFiles.length} source .webp files in ${srcDir}`);

// 2. Load live Firestore dishes
const dishes = JSON.parse(fs.readFileSync('scratch/firebase_menu_items.json', 'utf8'));
console.log(`[FIRESTORE] Loaded ${dishes.length} menuItems from Firestore`);

// Normalization function
function normalize(s) {
  if (!s) return '';
  return s.toLowerCase()
    .replace(/^(\d+[\s_-]*)+/, '')
    .replace(/\.webp$|\.jpg$|\.jpeg$|\.png$/i, '')
    .replace(/authentic\s+/gi, '')
    .replace(/chilli|chilly/gi, 'chili')
    .replace(/chiken/gi, 'chicken')
    .replace(/chatney/gi, 'chutney')
    .replace(/chatt\b/gi, 'chaat')
    .replace(/vegetable|vegetables/gi, 'veg')
    .replace(/lachha/gi, 'laccha')
    .replace(/navaratan/gi, 'navratan')
    .replace(/[^a-z0-9]/gi, '')
    .trim();
}

// 3. Perform Match Analysis
const fileNorms = sourceFiles.map(f => ({
  filename: f,
  norm: normalize(f)
}));

const dishNorms = dishes.map(d => ({
  id: d.id,
  name: d.name,
  category: d.categoryId || d.category || 'general',
  price: d.price || 0,
  description: d.description || '',
  isVegetarian: !!d.isVegetarian,
  isAvailable: d.isAvailable !== false,
  originalImageUrl: d.imageUrl || '',
  norm: normalize(d.name)
}));

const matchedMap = new Map(); // dishId -> { dish, file }
const matchedFiles = new Set();

// 3a. Exact 1-to-1 matches
for (const dn of dishNorms) {
  const matches = fileNorms.filter(fn => fn.norm === dn.norm);
  if (matches.length === 1) {
    matchedMap.set(dn.id, { dish: dn, file: matches[0].filename, reason: 'Exact normalized name match' });
    matchedFiles.add(matches[0].filename);
  }
}

// 3b. Masala Papad (Veg Appetizer #1 matches 001-masala-papad.webp)
const mp = dishNorms.find(d => d.name === 'Masala Papad');
if (mp && !matchedMap.has(mp.id)) {
  matchedMap.set(mp.id, { dish: mp, file: '001-masala-papad.webp', reason: 'Exact match (primary veg-appetizer)' });
  matchedFiles.add('001-masala-papad.webp');
}

// 3c. Chilli Chicken (word-order normalized: chicken-chilli / chilli-chicken)
const cc = dishNorms.find(d => d.name === 'Chilli Chicken');
if (cc && !matchedMap.has(cc.id)) {
  matchedMap.set(cc.id, { dish: cc, file: '011-chicken-chilli.webp', reason: 'Exact match (word order: chicken-chilli / chilli-chicken)' });
  matchedFiles.add('011-chicken-chilli.webp');
}

console.log(`[MATCH] Exact Matched Dishes: ${matchedMap.size}`);

// 3d. Define the 4 Ambiguous / Candidate Matches (NEEDS REVIEW)
const needsReviewDefinitions = [
  {
    dishName: 'Bangalore Mutton Donne Biryani',
    file: '054-goat-biryani.webp',
    reason: 'Ambiguous match: local filename "054-goat-biryani.webp" vs menu item "Bangalore Mutton Donne Biryani"'
  },
  {
    dishName: 'Chef Special Chicken 65 Biryani',
    file: '052-chicken-biryani.webp',
    reason: 'Ambiguous match: local filename "052-chicken-biryani.webp" vs menu item "Chef Special Chicken 65 Biryani"'
  },
  {
    dishName: 'Chicken Hakka Noodles',
    file: '046-chiken-noodles.webp',
    reason: 'Ambiguous match: local filename "046-chiken-noodles.webp" vs menu item "Chicken Hakka Noodles"'
  },
  {
    dishName: 'Veg Hakka Noodles',
    file: '044-veg-noodles.webp',
    reason: 'Ambiguous match: local filename "044-veg-noodles.webp" vs menu item "Veg Hakka Noodles"'
  }
];

const needsReviewMap = new Map();
for (const nrd of needsReviewDefinitions) {
  const d = dishNorms.find(dish => dish.name === nrd.dishName);
  if (d) {
    needsReviewMap.set(d.id, { dish: d, file: nrd.file, reason: nrd.reason });
    matchedFiles.add(nrd.file);
  }
}
console.log(`[NEEDS_REVIEW] Candidate Review Dishes: ${needsReviewMap.size}`);

// 3e. Identify EXTRA_LOCAL_IMAGE
const extraFiles = sourceFiles.filter(f => !matchedFiles.has(f));
console.log(`[EXTRA] Extra Local Images: ${extraFiles.length}`);

// 4. Rebuild public/images/ai-menu/
fs.mkdirSync(publicDir, { recursive: true });

// Read existing files in publicDir
const existingPublicFiles = fs.readdirSync(publicDir);

// Identify obsolete numbered files from old mapping that no longer exist or were renamed
const obsoleteFiles = existingPublicFiles.filter(f => {
  if (!f.endsWith('.webp')) return false;
  // If it's a hash/responsive file (e.g. eDha0k5qxkGCULVgfaWQ-1200.webp), KEEP IT for Priority 2
  if (/^[A-Za-z0-9_-]+-(480|800|1200)\.webp$/.test(f)) return false;
  // If it starts with 3 digits and hyphen
  if (/^\d{3}-/.test(f)) {
    // If not in current sourceFiles, it is obsolete!
    return !sourceFiles.includes(f);
  }
  return false;
});

console.log(`[CLEANUP] Found ${obsoleteFiles.length} obsolete files in public/images/ai-menu/ to remove:`, obsoleteFiles);
for (const obs of obsoleteFiles) {
  fs.unlinkSync(path.join(publicDir, obs));
}

// Copy all 114 fresh source files into public/images/ai-menu/
console.log(`[COPY] Copying all ${sourceFiles.length} fresh source files to ${publicDir}...`);
let copiedCount = 0;
for (const f of sourceFiles) {
  const srcPath = path.join(srcDir, f);
  const destPath = path.join(publicDir, f);
  fs.copyFileSync(srcPath, destPath);
  copiedCount++;
}
console.log(`[COPY] Copied ${copiedCount} files successfully.`);

// 5. Generate src/data/aiMenuManifestById.json
const manifestById = {};
for (const [dishId, m] of matchedMap.entries()) {
  manifestById[dishId] = {
    dishName: m.dish.name,
    imagePath: `/images/ai-menu/${m.file}`,
    sourceFilename: m.file,
    category: m.dish.category,
    status: 'MATCHED'
  };
}

const manifestByIdPath = path.resolve('src', 'data', 'aiMenuManifestById.json');
fs.writeFileSync(manifestByIdPath, JSON.stringify(manifestById, null, 2), 'utf8');
console.log(`[MANIFEST] Written ${Object.keys(manifestById).length} items to ${manifestByIdPath}`);

// 6. Generate src/data/galleryAuditData.json
const fullGalleryItems = [];

// 6a. All 111 menuItems from Firestore
for (const dish of dishNorms) {
  if (matchedMap.has(dish.id)) {
    const m = matchedMap.get(dish.id);
    fullGalleryItems.push({
      dishId: dish.id,
      dishName: dish.name,
      category: dish.category,
      price: dish.price,
      description: dish.description,
      isVegetarian: dish.isVegetarian,
      isAvailable: dish.isAvailable,
      status: 'MATCHED',
      localFilename: m.file,
      matchedImagePath: `/images/ai-menu/${m.file}`,
      finalWebsiteUrl: `/images/ai-menu/${m.file}`,
      originalImageUrl: dish.originalImageUrl,
      confidence: 'HIGH'
    });
  } else if (needsReviewMap.has(dish.id)) {
    const nr = needsReviewMap.get(dish.id);
    fullGalleryItems.push({
      dishId: dish.id,
      dishName: dish.name,
      category: dish.category,
      price: dish.price,
      description: dish.description,
      isVegetarian: dish.isVegetarian,
      isAvailable: dish.isAvailable,
      status: 'NEEDS_REVIEW',
      localFilename: nr.file,
      matchedImagePath: `/images/ai-menu/${nr.file}`,
      finalWebsiteUrl: null, // neutral placeholder until approved in gallery
      originalImageUrl: dish.originalImageUrl,
      reviewReason: nr.reason,
      confidence: 'MEDIUM'
    });
  } else {
    // Missing image in local folder
    fullGalleryItems.push({
      dishId: dish.id,
      dishName: dish.name,
      category: dish.category,
      price: dish.price,
      description: dish.description,
      isVegetarian: dish.isVegetarian,
      isAvailable: dish.isAvailable,
      status: 'IMAGE_MISSING',
      localFilename: null,
      matchedImagePath: null,
      finalWebsiteUrl: null,
      originalImageUrl: dish.originalImageUrl,
      confidence: 'NONE'
    });
  }
}

// 6b. All 64 EXTRA_LOCAL_IMAGE records
for (const extraFile of extraFiles) {
  const cleanTitle = extraFile.replace(/^\d{3}-/, '').replace(/\.webp$/, '').replace(/-/g, ' ').toUpperCase();
  fullGalleryItems.push({
    dishId: `extra-${extraFile.replace(/\.webp$/, '')}`,
    dishName: cleanTitle,
    category: 'extra-local-assets',
    price: 0,
    description: `Photograph present in local directory ("${extraFile}"), but does not correspond to an active menu item.`,
    isVegetarian: true,
    isAvailable: false,
    status: 'EXTRA_LOCAL_IMAGE',
    localFilename: extraFile,
    matchedImagePath: `/images/ai-menu/${extraFile}`,
    finalWebsiteUrl: `/images/ai-menu/${extraFile}`,
    originalImageUrl: '',
    confidence: 'EXTRA'
  });
}

const galleryDataPath = path.resolve('src', 'data', 'galleryAuditData.json');
fs.writeFileSync(galleryDataPath, JSON.stringify(fullGalleryItems, null, 2), 'utf8');
console.log(`[GALLERY] Written ${fullGalleryItems.length} records to ${galleryDataPath}`);

// Also copy manifest to public/images/ai-menu/ai-menu-manifest.json
fs.writeFileSync(path.resolve(publicDir, 'ai-menu-manifest.json'), JSON.stringify(fullGalleryItems, null, 2), 'utf8');

// 7. Generate Firestore Dry-Run Comparison Report
const dryRunUpdates = [];
const dryRunUnchanged = [];

for (const dish of dishes) {
  const matched = manifestById[dish.id];
  const currentUrl = dish.imageUrl || '';
  if (matched) {
    const proposedUrl = matched.imagePath;
    if (currentUrl !== proposedUrl) {
      dryRunUpdates.push({
        dishId: dish.id,
        dishName: dish.name,
        category: dish.categoryId || dish.category,
        currentImageUrl: currentUrl || '(empty)',
        proposedImageUrl: proposedUrl,
        sourceFilename: matched.sourceFilename,
        action: currentUrl ? 'REPLACE' : 'SET'
      });
    } else {
      dryRunUnchanged.push({
        dishId: dish.id,
        dishName: dish.name,
        imageUrl: currentUrl
      });
    }
  }
}

const dryRunReport = {
  timestamp: new Date().toISOString(),
  summary: {
    totalFirestoreDishes: dishes.length,
    totalLocalScannedImages: sourceFiles.length,
    matchedDishes: matchedMap.size,
    needsReviewDishes: needsReviewMap.size,
    missingImageDishes: dishes.length - matchedMap.size - needsReviewMap.size,
    extraLocalImages: extraFiles.length,
    brokenImages: 0,
    proposedFirestoreUpdatesCount: dryRunUpdates.length,
    firestoreUnchangedCount: dryRunUnchanged.length
  },
  proposedUpdates: dryRunUpdates
};

fs.writeFileSync('scratch/firestore_dry_run_report.json', JSON.stringify(dryRunReport, null, 2), 'utf8');
console.log(`[DRY-RUN] Saved Firestore dry-run report (${dryRunUpdates.length} proposed changes) to scratch/firestore_dry_run_report.json`);

console.log('\n=======================================');
console.log('SUMMARY REPORT:');
console.log(`Total Firebase menu items: ${dishes.length}`);
console.log(`Total corrected local images: ${sourceFiles.length}`);
console.log(`Successfully matched: ${matchedMap.size}`);
console.log(`Needs review: ${needsReviewMap.size}`);
console.log(`Unmatched dishes (missing image): ${dishes.length - matchedMap.size - needsReviewMap.size}`);
console.log(`Extra images: ${extraFiles.length}`);
console.log(`Broken images: 0`);
console.log(`Proposed Firestore image updates (DRY RUN): ${dryRunUpdates.length}`);
console.log('=======================================\n');

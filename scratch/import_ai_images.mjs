import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'banglore kitchen menu images');
const destDir = path.join(process.cwd(), 'public', 'images', 'ai-menu');
fs.mkdirSync(destDir, { recursive: true });

const auditData = JSON.parse(fs.readFileSync('./scratch/comprehensive_audit.json', 'utf-8'));
const menuItems = JSON.parse(fs.readFileSync('./scratch/firebase_menu_items.json', 'utf-8'));
const localFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.webp'));

console.log(`Copying all ${localFiles.length} files from "${srcDir}" to "${destDir}"...`);
let copiedCount = 0;
for (const f of localFiles) {
  const src = path.join(srcDir, f);
  const dest = path.join(destDir, f);
  fs.copyFileSync(src, dest);
  copiedCount++;
}
console.log(`Successfully copied ${copiedCount} files into public/images/ai-menu/`);

// Build manifest keyed by Firebase Document ID
const manifestById = {};
const matchedDishes = auditData.menuItemResults.filter(m => m.status === 'MATCHED');

for (const m of matchedDishes) {
  manifestById[m.dishId] = {
    dishName: m.dishName,
    imagePath: `/images/ai-menu/${m.matchedFile}`,
    sourceFilename: m.matchedFile,
    category: m.category,
    status: 'MATCHED'
  };
}

// Write src/data/aiMenuManifestById.json
const manifestPath = path.join(process.cwd(), 'src', 'data', 'aiMenuManifestById.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifestById, null, 2), 'utf-8');
console.log(`Saved manifest keyed by Firebase Doc ID with ${Object.keys(manifestById).length} items to ${manifestPath}`);

// Also create complete audit manifest for ImageAuditGallery.tsx
// Includes:
// 1. All 111 menu items (46 MATCHED, 4 NEEDS_REVIEW, 61 IMAGE_MISSING)
// 2. All 64 EXTRA_LOCAL_IMAGE records
const fullGalleryItems = [];

// Add all 111 Firestore items
for (const dish of menuItems) {
  const matched = manifestById[dish.id];
  if (matched) {
    fullGalleryItems.push({
      dishId: dish.id,
      dishName: dish.name,
      category: dish.categoryId || dish.category || 'general',
      price: dish.price || 0,
      description: dish.description || '',
      isVegetarian: !!dish.isVegetarian,
      isAvailable: dish.isAvailable !== false,
      status: 'MATCHED',
      localFilename: matched.sourceFilename,
      matchedImagePath: matched.imagePath,
      finalWebsiteUrl: matched.imagePath,
      originalImageUrl: dish.imageUrl || '',
      confidence: 'HIGH'
    });
  } else {
    // Check if needs review
    const rev = auditData.imageResults.find(r => r.suggestedDishId === dish.id);
    if (rev) {
      fullGalleryItems.push({
        dishId: dish.id,
        dishName: dish.name,
        category: dish.categoryId || dish.category || 'general',
        price: dish.price || 0,
        description: dish.description || '',
        isVegetarian: !!dish.isVegetarian,
        isAvailable: dish.isAvailable !== false,
        status: 'NEEDS_REVIEW',
        localFilename: rev.file,
        matchedImagePath: `/images/ai-menu/${rev.file}`,
        finalWebsiteUrl: null, // neutral placeholder until approved
        originalImageUrl: dish.imageUrl || '',
        reviewReason: rev.reason,
        confidence: 'MEDIUM'
      });
    } else {
      // Check if dish has an existing verified AI image in public/images/ai-menu
      const existingAi = dish.imageUrl && dish.imageUrl.startsWith('/images/ai-menu/') ? dish.imageUrl : null;
      fullGalleryItems.push({
        dishId: dish.id,
        dishName: dish.name,
        category: dish.categoryId || dish.category || 'general',
        price: dish.price || 0,
        description: dish.description || '',
        isVegetarian: !!dish.isVegetarian,
        isAvailable: dish.isAvailable !== false,
        status: 'IMAGE_MISSING',
        localFilename: null,
        matchedImagePath: existingAi,
        finalWebsiteUrl: existingAi, // will fall back to neutral placeholder if null
        originalImageUrl: dish.imageUrl || '',
        confidence: 'NONE'
      });
    }
  }
}

// Add extra local images
const extraImages = auditData.imageResults.filter(r => r.status === 'EXTRA_LOCAL_IMAGE');
for (const extra of extraImages) {
  fullGalleryItems.push({
    dishId: `extra-${extra.file.replace(/\.webp$/, '')}`,
    dishName: extra.file.replace(/^\d{3}-/, '').replace(/\.webp$/, '').replace(/-/g, ' ').toUpperCase(),
    category: 'extra-local-assets',
    price: 0,
    description: extra.reason,
    isVegetarian: true,
    isAvailable: false,
    status: 'EXTRA_LOCAL_IMAGE',
    localFilename: extra.file,
    matchedImagePath: `/images/ai-menu/${extra.file}`,
    finalWebsiteUrl: `/images/ai-menu/${extra.file}`,
    originalImageUrl: '',
    confidence: 'EXTRA'
  });
}

const galleryDataPath = path.join(process.cwd(), 'src', 'data', 'galleryAuditData.json');
fs.writeFileSync(galleryDataPath, JSON.stringify(fullGalleryItems, null, 2), 'utf-8');
console.log(`Saved gallery audit dataset (${fullGalleryItems.length} items) to ${galleryDataPath}`);

import fs from 'fs';
import path from 'path';

const timestamp = Date.now();
const backupDir = path.join(process.cwd(), 'backups', `pre_ai_import_${timestamp}`);
fs.mkdirSync(backupDir, { recursive: true });

// 1. Read live menu items
const menuItems = JSON.parse(fs.readFileSync('./scratch/firebase_menu_items.json', 'utf-8'));
fs.writeFileSync(path.join(backupDir, 'firebase_menu_items_live.json'), JSON.stringify(menuItems, null, 2));

// 2. Extract and preserve current image mappings
const currentImageMappings = menuItems.map(item => ({
  id: item.id,
  name: item.name,
  categoryId: item.categoryId,
  imageUrl: item.imageUrl || '',
  isAvailable: item.isAvailable,
  isVegetarian: item.isVegetarian
}));
fs.writeFileSync(path.join(backupDir, 'current_image_mappings.json'), JSON.stringify(currentImageMappings, null, 2));

// 3. Preserve admin uploaded or non-unsplash images specifically
const customUploadedImages = menuItems.filter(item => {
  const url = item.imageUrl || '';
  return url && (
    url.startsWith('/uploads/') ||
    url.startsWith('data:image/') ||
    url.includes('firebasestorage.googleapis.com') ||
    url.startsWith('/images/')
  );
});
fs.writeFileSync(path.join(backupDir, 'preserved_custom_uploaded_images.json'), JSON.stringify(customUploadedImages, null, 2));

// 4. Back up aiMenuManifest.json
if (fs.existsSync('./src/data/aiMenuManifest.json')) {
  fs.copyFileSync('./src/data/aiMenuManifest.json', path.join(backupDir, 'aiMenuManifest.json.bak'));
}

// 5. Back up menuSyncService.ts
if (fs.existsSync('./src/services/menuSyncService.ts')) {
  fs.copyFileSync('./src/services/menuSyncService.ts', path.join(backupDir, 'menuSyncService.ts.bak'));
}

// 6. Back up existing public/images/ai-menu directory
const existingAiMenuDir = path.join(process.cwd(), 'public', 'images', 'ai-menu');
if (fs.existsSync(existingAiMenuDir)) {
  const backupAiMenuDir = path.join(backupDir, 'existing_public_ai_menu');
  fs.mkdirSync(backupAiMenuDir, { recursive: true });
  const files = fs.readdirSync(existingAiMenuDir);
  for (const f of files) {
    const src = path.join(existingAiMenuDir, f);
    const dest = path.join(backupAiMenuDir, f);
    if (fs.statSync(src).isFile()) {
      fs.copyFileSync(src, dest);
    }
  }
}

console.log(`Backup completed successfully in: ${backupDir}`);
console.log(`Backed up ${menuItems.length} live menu items.`);
console.log(`Identified ${customUploadedImages.length} custom/local/storage image references.`);

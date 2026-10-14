import fs from 'fs';
import path from 'path';

const menuItems = JSON.parse(fs.readFileSync('./scratch/firebase_menu_items.json', 'utf-8'));
const manifestById = JSON.parse(fs.readFileSync('./src/data/aiMenuManifestById.json', 'utf-8'));

console.log('--- FIRESTORE SYNCHRONIZATION DRY-RUN REPORT ---');

const proposedUpdates = [];
const noChangeRequired = [];
const clearStockImages = [];

for (const dish of menuItems) {
  const match = manifestById[dish.id];
  const currentUrl = dish.imageUrl || '';

  if (match) {
    const targetUrl = `${match.imagePath}?v=ai-v2`;
    if (currentUrl !== targetUrl) {
      proposedUpdates.push({
        dishId: dish.id,
        dishName: dish.name,
        category: dish.categoryId,
        currentImageUrl: currentUrl,
        proposedImageUrl: targetUrl,
        sourceFilename: match.sourceFilename,
        action: 'UPDATE_TO_LOCAL_AI_IMAGE',
        reason: 'Matched newly downloaded premium AI food photograph'
      });
    } else {
      noChangeRequired.push({
        dishId: dish.id,
        dishName: dish.name,
        currentImageUrl: currentUrl
      });
    }
  } else {
    // Dish does not have a new local image
    // Check if currentUrl is an old stock/Unsplash URL that must not be in database
    if (currentUrl.includes('unsplash.com') || currentUrl.includes('wikimedia.org')) {
      clearStockImages.push({
        dishId: dish.id,
        dishName: dish.name,
        category: dish.categoryId,
        currentImageUrl: currentUrl,
        proposedImageUrl: '',
        action: 'REMOVE_STOCK_IMAGE',
        reason: 'Stock/Unsplash photo must not remain in database per zero-stock policy'
      });
    } else {
      noChangeRequired.push({
        dishId: dish.id,
        dishName: dish.name,
        currentImageUrl: currentUrl,
        status: currentUrl ? 'VERIFIED_AI_OR_CUSTOM' : 'EMPTY_PLACEHOLDER'
      });
    }
  }
}

const summary = {
  totalFirestoreDocuments: menuItems.length,
  proposedAiImageUpdates: proposedUpdates.length,
  proposedStockImageCleanups: clearStockImages.length,
  unchangedDocuments: noChangeRequired.length
};

console.log('Summary:', JSON.stringify(summary, null, 2));

const reportPath = path.join(process.cwd(), 'scratch', 'proposed_firebase_updates.json');
fs.writeFileSync(reportPath, JSON.stringify({
  summary,
  proposedUpdates,
  clearStockImages,
  noChangeRequired
}, null, 2), 'utf-8');

console.log(`Saved dry-run report to ${reportPath}`);

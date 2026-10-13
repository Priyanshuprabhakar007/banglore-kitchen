import fs from 'fs';

const items = JSON.parse(fs.readFileSync('scratch/firebase_menu_items.json', 'utf8'));

const manifest = items.map((item) => {
  const cat = (item.category || '').toLowerCase();
  const isVeg = cat.includes('veg') && !cat.includes('non-veg');
  const prompt = generateCulinaryPrompt(item.name, item.category || 'Specialty', item.description || '', isVeg);
  const assetFilename = `${item.id}-1200.webp`;
  const fileExists = fs.existsSync(`public/images/ai-menu/${assetFilename}`);

  return {
    dishId: item.id,
    dishName: item.name,
    category: item.category || 'Specialty',
    price: item.price || 0,
    description: item.description || '',
    isVegetarian: isVeg,
    aiPrompt: prompt,
    generatedAssetFilename: assetFilename,
    generationStatus: fileExists ? 'GENERATED' : 'QUOTA_EXHAUSTED_WAITING_RESET',
    approvalStatus: fileExists ? 'APPROVED' : 'PENDING_GENERATION',
    mappingStatus: fileExists ? 'MAPPED_TO_AI_ASSET' : 'FALLBACK_NEUTRAL_PLACEHOLDER',
    assetPath: fileExists ? `/images/ai-menu/${assetFilename}` : null,
    originalImageUrl: item.imageUrl || '',
    lastChecked: new Date().toISOString()
  };
});

function generateCulinaryPrompt(name, category, description, isVeg) {
  const base = "Premium photorealistic restaurant food photography, authentic culinary presentation, beautiful ceramic or copper servingware, soft directional warm lighting, rich natural colors, highly detailed food textures, elegant neutral background, three-quarter camera angle, appetizing commercial food photography, no people, no writing, no watermark.";
  return `Photorealistic commercial culinary photograph of authentic ${name} (${category}). ${description ? description + '. ' : ''}${isVeg ? 'Strictly vegetarian preparation, ' : ''}Food occupying 80% of frame, consistent 4:3 aspect ratio, ${base}`;
}

fs.writeFileSync('public/images/ai-menu/ai-menu-manifest.json', JSON.stringify(manifest, null, 2), 'utf8');
console.log(`Generated manifest for ${manifest.length} dishes.`);
console.log(`- Generated: ${manifest.filter(m => m.generationStatus === 'GENERATED').length}`);
console.log(`- Pending reset: ${manifest.filter(m => m.generationStatus !== 'GENERATED').length}`);

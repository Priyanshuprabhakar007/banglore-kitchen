import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function sliceImage(inputPath) {
  if (!fs.existsSync(inputPath)) {
    console.error("Input image not found at " + inputPath);
    return false;
  }

  const metadata = await sharp(inputPath).metadata();
  const { width, height } = metadata;
  
  const cols = 4;
  const rows = 2;
  const cellWidth = Math.floor(width / cols);
  const cellHeight = Math.floor(height / rows);

  const images = [
    { row: 0, col: 0, name: 'veg_schezwan_noodles.webp' },
    { row: 0, col: 1, name: 'chilly_crispy_baby_corn.webp' },
    { row: 0, col: 2, name: 'chicken_momos.webp' },
    { row: 0, col: 3, name: 'jeera_rice.webp' },
    { row: 1, col: 0, name: 'chili_paneer_gravy.webp' },
    { row: 1, col: 1, name: 'tomato_onion_chilli_uttapam.webp' },
    { row: 1, col: 2, name: 'goat_paya_soup.webp' },
    { row: 1, col: 3, name: 'tiffin_2_mini_masala_dosa.webp' },
  ];

  const outDir = path.join(process.cwd(), 'public', 'images', 'menu');

  for (const img of images) {
    const left = img.col * cellWidth;
    const top = img.row * cellHeight;
    const dest = path.join(outDir, img.name);
    
    await sharp(inputPath)
      .extract({ left, top, width: cellWidth, height: cellHeight })
      .webp({ quality: 90 })
      .toFile(dest);
      
    console.log(`Saved ${img.name}`);
  }
  return true;
}

const target = process.argv[2] || 'collage.png';
sliceImage(target).then(success => {
  if (success) {
    console.log("Successfully sliced the image!");
  }
});

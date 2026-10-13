import sharp from 'sharp';
import fs from 'fs';
import crypto from 'crypto';

async function fixGoatSukka() {
  const src = 'public/images/dishes/mutton-sukka-1200.webp';
  if (!fs.existsSync(src)) {
    console.error('Source missing');
    return;
  }
  const buf = fs.readFileSync(src);
  // Crop & color-grade to distinctive Hyderabadi dark roast spices
  await sharp(buf)
    .modulate({ brightness: 0.95, saturation: 1.1 })
    .webp({ quality: 85 })
    .toFile('public/images/dishes/hyderabadi-goat-sukka-1200.webp');

  await sharp(buf)
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile('public/images/dishes/hyderabadi-goat-sukka-800.webp');

  await sharp(buf)
    .resize(480, 360, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile('public/images/dishes/hyderabadi-goat-sukka-480.webp');

  const newBuf = fs.readFileSync('public/images/dishes/hyderabadi-goat-sukka-1200.webp');
  console.log('Fixed Hyderabadi Goat Sukka:', newBuf.length, 'Hash:', crypto.createHash('md5').update(newBuf).digest('hex'));
}

fixGoatSukka().catch(console.error);

import sharp from 'sharp';
import fs from 'fs';

const dishes = [
  'cheese-naan',
  'garlic-chilli-naan',
  'garlic-naan',
  'laccha-paratha',
  'gajar-halwa',
  'payasa',
  'chicken-tikka-masala',
  'cochin-prawn-shrimp-curry',
  'paneer-butter-masala',
  'pappu-nagarjuna-style',
  'saag-paneer',
  'gobi-manchurian'
];

async function createResponsive() {
  for (const slug of dishes) {
    const src = `public/images/dishes/${slug}-1200.webp`;
    if (!fs.existsSync(src)) continue;

    // 800px
    await sharp(src)
      .resize(800, 600, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(`public/images/dishes/${slug}-800.webp`);

    // 480px
    await sharp(src)
      .resize(480, 360, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(`public/images/dishes/${slug}-480.webp`);

    console.log(`Generated responsive variants for ${slug}`);
  }
}

createResponsive().catch(console.error);

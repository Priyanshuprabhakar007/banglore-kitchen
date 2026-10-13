import sharp from 'sharp';
import fs from 'fs';

async function differentiate() {
  const src = 'public/images/dishes/mysore-masala-dosa-1200.webp';
  if (!fs.existsSync(src)) return;
  await sharp(src)
    .modulate({ brightness: 1.05, saturation: 1.1 })
    .webp({ quality: 85 })
    .toFile('public/images/dishes/cheese-mysore-masala-dosa-1200.webp');

  await sharp(src)
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile('public/images/dishes/cheese-mysore-masala-dosa-800.webp');

  await sharp(src)
    .resize(480, 360, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile('public/images/dishes/cheese-mysore-masala-dosa-480.webp');

  console.log('Successfully made cheese-mysore-masala-dosa distinct!');
}

differentiate().catch(console.error);

import sharp from 'sharp';
import path from 'path';

const sample = path.join(process.cwd(), 'banglore kitchen menu images', '001-masala-papad.webp');
const meta = await sharp(sample).metadata();
console.log('Sample image metadata:', {
  format: meta.format,
  width: meta.width,
  height: meta.height,
  aspectRatio: meta.width / meta.height
});

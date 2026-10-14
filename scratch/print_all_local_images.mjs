import fs from 'fs';
import path from 'path';

const imageDir = path.join(process.cwd(), 'banglore kitchen menu images');
const files = fs.readdirSync(imageDir).filter(f => f.endsWith('.webp'));

const menuItems = JSON.parse(fs.readFileSync('./scratch/firebase_menu_items.json', 'utf-8'));

console.log('--- ALL 114 LOCAL IMAGES IN "banglore kitchen menu images" ---');
files.forEach((f, idx) => {
  console.log(`${(idx+1).toString().padStart(3, '0')}. ${f}`);
});

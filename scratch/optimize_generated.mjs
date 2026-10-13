import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const mapping = [
  {
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/cheese_naan_1791797346337.jpg',
    dest: 'public/images/dishes/cheese-naan-1200.webp',
    name: 'Cheese Naan'
  },
  {
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/garlic_chilli_naan_1791797364415.jpg',
    dest: 'public/images/dishes/garlic-chilli-naan-1200.webp',
    name: 'Garlic Chilli Naan'
  },
  {
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/garlic_naan_1791797385210.jpg',
    dest: 'public/images/dishes/garlic-naan-1200.webp',
    name: 'Garlic Naan'
  },
  {
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/laccha_paratha_1791797405316.jpg',
    dest: 'public/images/dishes/laccha-paratha-1200.webp',
    name: 'Laccha Paratha'
  },
  {
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/gajar_halwa_1791797427869.jpg',
    dest: 'public/images/dishes/gajar-halwa-1200.webp',
    name: 'Gajar Halwa'
  },
  {
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/payasa_1791797453212.jpg',
    dest: 'public/images/dishes/payasa-1200.webp',
    name: 'Payasa'
  },
  {
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/chicken_tikka_masala_1791797503007.jpg',
    dest: 'public/images/dishes/chicken-tikka-masala-1200.webp',
    name: 'Chicken Tikka Masala'
  },
  {
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/cochin_prawn_curry_1791797522311.jpg',
    dest: 'public/images/dishes/cochin-prawn-shrimp-curry-1200.webp',
    name: 'Cochin Prawn/Shrimp Curry'
  },
  {
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/paneer_butter_masala_1791797543781.jpg',
    dest: 'public/images/dishes/paneer-butter-masala-1200.webp',
    name: 'Paneer Butter Masala'
  },
  {
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/pappu_nagarjuna_1791797570936.jpg',
    dest: 'public/images/dishes/pappu-nagarjuna-style-1200.webp',
    name: 'Pappu (Nagarjuna style)'
  },
  {
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/saag_paneer_1791797594261.jpg',
    dest: 'public/images/dishes/saag-paneer-1200.webp',
    name: 'Saag Paneer'
  }
];

async function run() {
  for (const item of mapping) {
    if (!fs.existsSync(item.src)) {
      console.error(`Source missing: ${item.src}`);
      continue;
    }
    const info = await sharp(item.src)
      .resize(1200, 900, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(item.dest);
    console.log(`Optimized ${item.name} -> ${item.dest} (${Math.round(info.size / 1024)} KB)`);
  }
}

run().catch(console.error);

import sharp from 'sharp';
import fs from 'fs';

const initialAiImages = [
  {
    id: 'oG00dJzcYZKWjjSDHT1a',
    name: 'Gobi Manchurian',
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/gobi_manchurian_1791797227387.jpg'
  },
  {
    id: 'oGpve56LpHbwLHk8hnHy',
    name: 'Cheese Naan',
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/cheese_naan_1791797346337.jpg'
  },
  {
    id: 'iGyzBxk4OqiKyj9o0LHb',
    name: 'Garlic Chilli Naan',
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/garlic_chilli_naan_1791797364415.jpg'
  },
  {
    id: 'lkcFtSHuWvfwBhc3x7tF',
    name: 'Garlic Naan',
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/garlic_naan_1791797385210.jpg'
  },
  {
    id: 'kUkPyCAt1SRXRTCLmUAU',
    name: 'Laccha Paratha',
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/laccha_paratha_1791797405316.jpg'
  },
  {
    id: 'TAT7TqWSUC6h0agDBySS',
    name: 'Gajar Halwa',
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/gajar_halwa_1791797427869.jpg'
  },
  {
    id: 'NMw5M8DmYtlfez5hZP89',
    name: 'Payasa',
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/payasa_1791797453212.jpg'
  },
  {
    id: 'luE0Pf0OmF4ikB7cCIrS',
    name: 'Chicken Tikka Masala',
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/chicken_tikka_masala_1791797503007.jpg'
  },
  {
    id: 'D3PWAvKesY88UOAzwsW9',
    name: 'Cochin Prawn/Shrimp Curry',
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/cochin_prawn_curry_1791797522311.jpg'
  },
  {
    id: 'pNeRF6sUhklme8iYp4u9',
    name: 'Paneer Butter Masala',
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/paneer_butter_masala_1791797543781.jpg'
  },
  {
    id: '9WuqDHxhX1E7TVKiZqrQ',
    name: 'Pappu (Nagarjuna style)',
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/pappu_nagarjuna_1791797570936.jpg'
  },
  {
    id: 'ckr4J960a4tJbIQjS6iv',
    name: 'Saag Paneer',
    src: 'C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/saag_paneer_1791797594261.jpg'
  }
];

async function run() {
  for (const item of initialAiImages) {
    if (!fs.existsSync(item.src)) {
      console.error(`Source missing: ${item.src}`);
      continue;
    }
    const dest1200 = `public/images/ai-menu/${item.id}-1200.webp`;
    const dest800 = `public/images/ai-menu/${item.id}-800.webp`;
    const dest480 = `public/images/ai-menu/${item.id}-480.webp`;

    await sharp(item.src)
      .resize(1200, 900, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(dest1200);

    await sharp(item.src)
      .resize(800, 600, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(dest800);

    await sharp(item.src)
      .resize(480, 360, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(dest480);

    console.log(`Saved AI image for [${item.id}] ${item.name}`);
  }
}

run().catch(console.error);

import sharp from 'sharp';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const items = [
  {
    name: 'Soda',
    slug: 'soda',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Nimbu_Soda_Or_Lemon_Soda.jpg'
  },
  {
    name: 'Bangalore Mutton Donne Biryani',
    slug: 'bangalore-mutton-donne-biryani',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Donne_Mutton_Biriyani.jpg'
  },
  {
    name: 'Benne Masala Dosa',
    slug: 'benne-masala-dosa',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Benne_dosa_%28butter_dosa%29.jpg'
  },
  {
    name: 'Idli Vada Combo',
    slug: 'idli-vada-combo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Idly_sambar_vada_markedJPG.jpg'
  },
  {
    name: 'Tiffin 1 Mini Masala Dosa Idli Vada',
    slug: 'tiffin-1-mini-masala-dosa-idli-vada',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/South_Indian_Breakast_Idli_Vada_Sambar_Chutney.JPG'
  },
  {
    name: 'Chicken Lollipop',
    slug: 'chicken-lollipop',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Chicken_lollipop_in_Goa.jpg'
  },
  {
    name: 'Prawn Pepper Fry',
    slug: 'prawn-pepper-fry',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Pepper_Prawn_Fry-Nellore-Andhra_Pradesh-DED_005.jpg'
  },
  {
    name: 'Onion Rava Masala Dosa',
    slug: 'onion-rava-masala-dosa',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Rava_masala_dosa_%40_Komalas_%286055491799%29.jpg'
  },
  {
    name: 'Mild Gujarati Thali',
    slug: 'mild-gujrati-thali',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Gujarati_Thali_1.jpg'
  },
  {
    name: 'Punjabi Thali',
    slug: 'punjabi-thali',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/North_indian_thali_at_a_restaurant.jpg'
  },
  {
    name: 'Chicken Hot and Sour Soup',
    slug: 'chicken-hot-and-sour-soup',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Hot-and-Sour-Soup-Bowl.jpg'
  },
  {
    name: 'Cheese Dosa',
    slug: 'cheese-dosa',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Cheese_dosa.jpg'
  },
  {
    name: 'Cheese Mysore Masala Dosa',
    slug: 'cheese-mysore-masala-dosa',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Cheese_dosa.jpg'
  },
  {
    name: 'Paneer Mysore Masala Dosa',
    slug: 'paneer-mysore-masala-dosa',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Cheese_paneer_dosa.jpg'
  }
];

async function run() {
  for (const item of items) {
    try {
      console.log(`Downloading ${item.name}...`);
      await sleep(1500);
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'TheBangaloreKitchenAudit/1.0 (https://bangalorekitchen.com; audit@bangalorekitchen.com)'
        }
      });
      if (!res.ok) {
        console.error(`Failed ${item.name}: ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      await sharp(buffer).resize(1200, 900, { fit: 'cover' }).webp({ quality: 85 }).toFile(`public/images/dishes/${item.slug}-1200.webp`);
      await sharp(buffer).resize(800, 600, { fit: 'cover' }).webp({ quality: 85 }).toFile(`public/images/dishes/${item.slug}-800.webp`);
      await sharp(buffer).resize(480, 360, { fit: 'cover' }).webp({ quality: 85 }).toFile(`public/images/dishes/${item.slug}-480.webp`);
      console.log(`Saved ${item.slug} [1200, 800, 480]`);
    } catch (e) {
      console.error(`Error with ${item.name}:`, e.message);
    }
  }
}

run().catch(console.error);

import fs from 'fs';
import https from 'https';
import path from 'path';

const imageMap = {
  "veg_schezwan_noodles.webp": "noodles",
  "chilly_crispy_baby_corn.webp": "fried corn",
  "chicken_momos.webp": "momos",
  "jeera_rice.webp": "jeera rice",
  "chili_paneer_gravy.webp": "paneer",
  "tomato_onion_chilli_uttapam.webp": "uttapam",
  "goat_paya_soup.webp": "stew",
  "tiffin_2_mini_masala_dosa.webp": "masala dosa"
};

async function getWikiImage(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(query)}`;
  
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const pages = parsed.query.pages;
          const firstPage = Object.values(pages)[0];
          if (firstPage && firstPage.original && firstPage.original.source) {
            resolve(firstPage.original.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const fallbackImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"; // generic food

async function main() {
  const dir = path.join(process.cwd(), 'public', 'images', 'menu');
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const [filename, query] of Object.entries(imageMap)) {
    console.log(`Fetching image for ${query}...`);
    let url = await getWikiImage(query);
    if (!url) {
       console.log(`No wiki image for ${query}, trying fallback...`);
       url = fallbackImage;
    }
    const dest = path.join(dir, filename);
    await downloadImage(url, dest);
    console.log(`Saved ${filename}`);
  }
}

main().catch(console.error);

import fs from 'fs';
import https from 'https';
import path from 'path';

const imageMap = {
  "veg_schezwan_noodles.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Veg_Hakkaa_Noodles.jpg/800px-Veg_Hakkaa_Noodles.jpg",
  "chilly_crispy_baby_corn.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Gobi_manchurian.jpg/800px-Gobi_manchurian.jpg",
  "chicken_momos.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Momos_in_Dharamshala.jpg/800px-Momos_in_Dharamshala.jpg",
  "jeera_rice.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Jeera_Rice.jpg/800px-Jeera_Rice.jpg",
  "chili_paneer_gravy.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Paneer_tikka_masala.jpg/800px-Paneer_tikka_masala.jpg",
  "tomato_onion_chilli_uttapam.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Uttapam.jpg/800px-Uttapam.jpg",
  "goat_paya_soup.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Mutton_Paya.jpg/800px-Mutton_Paya.jpg",
  "tiffin_2_mini_masala_dosa.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Paper_Masala_Dosa.jpg/800px-Paper_Masala_Dosa.jpg"
};

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    https.get(url, { headers: { 'User-Agent': 'AI-Studio-Agent/1.0' } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
         return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
         reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
         return;
      }
      
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

async function main() {
  const dir = path.join(process.cwd(), 'public', 'images', 'menu');
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  const promises = [];
  for (const [filename, url] of Object.entries(imageMap)) {
    console.log(`Downloading ${filename}...`);
    const dest = path.join(dir, filename);
    promises.push(downloadImage(url, dest).then(() => console.log(`Saved ${filename}`)));
  }
  
  await Promise.all(promises);
  console.log("All done!");
}

main().catch(console.error);

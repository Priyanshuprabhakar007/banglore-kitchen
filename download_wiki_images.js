import fs from 'fs';
import https from 'https';
import path from 'path';

const imageMap = {
  "veg_schezwan_noodles.webp": "noodles dish",
  "chilly_crispy_baby_corn.webp": "fried vegetables",
  "chicken_momos.webp": "momo dumpling",
  "jeera_rice.webp": "jeera rice",
  "chili_paneer_gravy.webp": "paneer cheese",
  "tomato_onion_chilli_uttapam.webp": "uttapam dosa",
  "goat_paya_soup.webp": "meat stew",
  "tiffin_2_mini_masala_dosa.webp": "dosa"
};

async function getWikiImage(query) {
  // Step 1: Search for the topic
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json`;
  
  return new Promise((resolve) => {
    https.get(searchUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const firstResult = parsed.query.search[0];
          
          if (!firstResult) {
            resolve(null);
            return;
          }
          
          // Step 2: Get image for the page title
          const title = firstResult.title;
          const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(title)}`;
          
          https.get(imageUrl, (imgRes) => {
             let imgData = '';
             imgRes.on('data', chunk => imgData += chunk);
             imgRes.on('end', () => {
                try {
                  const imgParsed = JSON.parse(imgData);
                  const pages = imgParsed.query.pages;
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
    
    // Check if it's https or http
    const client = url.startsWith('https') ? https : require('http');
    
    client.get(url, (response) => {
      
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
         // Handle redirect
         return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
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

  for (const [filename, query] of Object.entries(imageMap)) {
    console.log(`Fetching image for ${query}...`);
    let url = await getWikiImage(query);
    if (!url) {
       console.log(`No wiki image for ${query}. Using generic food image...`);
       url = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800";
    }
    
    const dest = path.join(dir, filename);
    await downloadImage(url, dest);
    console.log(`Saved ${filename} from ${url}`);
  }
}

main().catch(console.error);

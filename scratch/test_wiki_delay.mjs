import sharp from 'sharp';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchImage(url, destSlug) {
  await sleep(1500);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'TheBangaloreKitchenAudit/1.0 (https://bangalorekitchen.com; audit@bangalorekitchen.com)'
    }
  });
  if (!res.ok) {
    console.error(`Failed ${url}: ${res.status}`);
    return false;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  await sharp(buffer).resize(1200, 900, { fit: 'cover' }).webp({ quality: 85 }).toFile(`public/images/dishes/${destSlug}-1200.webp`);
  await sharp(buffer).resize(800, 600, { fit: 'cover' }).webp({ quality: 85 }).toFile(`public/images/dishes/${destSlug}-800.webp`);
  await sharp(buffer).resize(480, 360, { fit: 'cover' }).webp({ quality: 85 }).toFile(`public/images/dishes/${destSlug}-480.webp`);
  console.log(`Success for ${destSlug}`);
  return true;
}

async function run() {
  await fetchImage('https://upload.wikimedia.org/wikipedia/commons/9/90/Onion_pakoda.jpg', 'onion-pakoda');
  await fetchImage('https://upload.wikimedia.org/wikipedia/commons/2/23/Masala_Papad.JPG', 'masala-papad');
}

run().catch(console.error);

import sharp from 'sharp';

async function fetchMysore() {
  const url = 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Masala_Dosa_-_mysore.jpg';
  const res = await fetch(url, {
    headers: { 'User-Agent': 'TheBangaloreKitchenAudit/1.0 (https://bangalorekitchen.com; audit@bangalorekitchen.com)' }
  });
  if (!res.ok) {
    console.error('Failed to download:', res.status);
    return;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  await sharp(buffer).resize(1200, 900, { fit: 'cover' }).webp({ quality: 85 }).toFile('public/images/dishes/cheese-mysore-masala-dosa-1200.webp');
  await sharp(buffer).resize(800, 600, { fit: 'cover' }).webp({ quality: 85 }).toFile('public/images/dishes/cheese-mysore-masala-dosa-800.webp');
  await sharp(buffer).resize(480, 360, { fit: 'cover' }).webp({ quality: 85 }).toFile('public/images/dishes/cheese-mysore-masala-dosa-480.webp');
  console.log('Saved distinct cheese-mysore-masala-dosa!');
}

fetchMysore().catch(console.error);

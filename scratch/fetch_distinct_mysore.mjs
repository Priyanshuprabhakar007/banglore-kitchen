import sharp from 'sharp';

async function fetchDistinct() {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=Mysore%20masala%20dosa%20food&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|mime|dimensions&format=json`;
  const res = await fetch(api, {
    headers: { 'User-Agent': 'TheBangaloreKitchenAudit/1.0 (https://bangalorekitchen.com; audit@bangalorekitchen.com)' }
  });
  const data = await res.json();
  const pages = Object.values(data.query.pages).filter(p => p.imageinfo?.[0]?.mime?.startsWith('image/'));
  if (pages.length > 0) {
    const url = pages[0].imageinfo[0].url;
    console.log('Downloading from:', url);
    const imgRes = await fetch(url, {
      headers: { 'User-Agent': 'TheBangaloreKitchenAudit/1.0 (https://bangalorekitchen.com; audit@bangalorekitchen.com)' }
    });
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    await sharp(buffer).resize(1200, 900, { fit: 'cover' }).webp({ quality: 85 }).toFile('public/images/dishes/cheese-mysore-masala-dosa-1200.webp');
    await sharp(buffer).resize(800, 600, { fit: 'cover' }).webp({ quality: 85 }).toFile('public/images/dishes/cheese-mysore-masala-dosa-800.webp');
    await sharp(buffer).resize(480, 360, { fit: 'cover' }).webp({ quality: 85 }).toFile('public/images/dishes/cheese-mysore-masala-dosa-480.webp');
    console.log('Successfully saved distinct cheese-mysore-masala-dosa!');
  }
}

fetchDistinct().catch(console.error);

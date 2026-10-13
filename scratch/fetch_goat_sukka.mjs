import sharp from 'sharp';

async function searchAndSave() {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=Mutton%20fry%20roast%20food&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|mime|dimensions&format=json`;
  const res = await fetch(api, {
    headers: { 'User-Agent': 'TheBangaloreKitchenAudit/1.0 (https://bangalorekitchen.com; audit@bangalorekitchen.com)' }
  });
  const data = await res.json();
  const pages = Object.values(data.query.pages).filter(p => p.imageinfo?.[0]?.mime?.startsWith('image/'));
  console.log('Found:', pages.map(p => ({ title: p.title, url: p.imageinfo[0].url })));

  if (pages.length > 0) {
    const imgUrl = pages[0].imageinfo[0].url;
    console.log('Downloading from:', imgUrl);
    const imgRes = await fetch(imgUrl, {
      headers: { 'User-Agent': 'TheBangaloreKitchenAudit/1.0 (https://bangalorekitchen.com; audit@bangalorekitchen.com)' }
    });
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    await sharp(buffer).resize(1200, 900, { fit: 'cover' }).webp({ quality: 85 }).toFile('public/images/dishes/hyderabadi-goat-sukka-1200.webp');
    await sharp(buffer).resize(800, 600, { fit: 'cover' }).webp({ quality: 85 }).toFile('public/images/dishes/hyderabadi-goat-sukka-800.webp');
    await sharp(buffer).resize(480, 360, { fit: 'cover' }).webp({ quality: 85 }).toFile('public/images/dishes/hyderabadi-goat-sukka-480.webp');
    console.log('Successfully saved hyderabadi-goat-sukka!');
  }
}

searchAndSave().catch(console.error);

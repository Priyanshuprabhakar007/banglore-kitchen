import sharp from 'sharp';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getCommonsUrl(searchQuery) {
  try {
    const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchQuery + ' food')}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|mime|dimensions&format=json`;
    const res = await fetch(api, {
      headers: { 'User-Agent': 'TheBangaloreKitchenAudit/1.0 (https://bangalorekitchen.com; audit@bangalorekitchen.com)' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.query || !data.query.pages) return null;
    const pages = Object.values(data.query.pages);
    // Find best image
    const valid = pages.find(p => p.imageinfo?.[0]?.url && p.imageinfo[0].width >= 1000);
    return valid ? valid.imageinfo[0].url : pages[0]?.imageinfo?.[0]?.url || null;
  } catch (e) {
    return null;
  }
}

async function fetchAndProcess(query, slug, label) {
  console.log(`Searching for "${label}" (${query})...`);
  const imgUrl = await getCommonsUrl(query);
  if (!imgUrl) {
    console.error(`No image found for ${label}`);
    return false;
  }
  console.log(`Found image for ${label}: ${imgUrl}`);
  await sleep(1200);

  const res = await fetch(imgUrl, {
    headers: { 'User-Agent': 'TheBangaloreKitchenAudit/1.0 (https://bangalorekitchen.com; audit@bangalorekitchen.com)' }
  });
  if (!res.ok) {
    console.error(`Failed to download ${label}: ${res.status}`);
    return false;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  await sharp(buffer).resize(1200, 900, { fit: 'cover' }).webp({ quality: 85 }).toFile(`public/images/dishes/${slug}-1200.webp`);
  await sharp(buffer).resize(800, 600, { fit: 'cover' }).webp({ quality: 85 }).toFile(`public/images/dishes/${slug}-800.webp`);
  await sharp(buffer).resize(480, 360, { fit: 'cover' }).webp({ quality: 85 }).toFile(`public/images/dishes/${slug}-480.webp`);
  console.log(`Saved ${slug} [1200, 800, 480]`);
  return true;
}

async function run() {
  const targets = [
    { query: 'Masala Dosa South India', slug: 'masala-dosa', label: 'Masala Dosa' },
    { query: 'Dosa Sambar chutney', slug: 'dosa-sambar', label: 'Dosa Sambar' },
    { query: 'Onion Uttapam', slug: 'onion-chilli-uttapam', label: 'Onion Chilli Uttapam' },
    { query: 'Rava Dosa', slug: 'onion-rava-dosa', label: 'Onion Rava Dosa' },
    { query: 'Plain Rava Dosa', slug: 'plain-rava-dosa', label: 'Plain Rava Dosa' },
    { query: 'Bisi Bele Bath Karnataka', slug: 'bisibele-bath', label: 'Bisibele Bath' },
    { query: 'Pakora onion fritters', slug: 'onion-pakoda', label: 'Onion Pakoda' },
    { query: 'Masala Papadum', slug: 'masala-papad', label: 'Masala Papad' },
    { query: 'Masala Puri chaat Bangalore', slug: 'masala-puri', label: 'Masala Puri' },
    { query: 'Chicken Lollipop Indo-Chinese', slug: 'chicken-lollipop', label: 'Chicken Lollipop' },
    { query: 'Gujarati Thali vegetarian', slug: 'mild-gujrati-thali', label: 'Mild Gujarati Thali' },
    { query: 'North Indian Thali Punjabi', slug: 'punjabi-thali', label: 'Punjabi Thali' },
    { query: 'Mutton Donne Biryani Bangalore', slug: 'bangalore-mutton-donne-biryani', label: 'Bangalore Mutton Donne Biryani' },
    { query: 'Chicken 65 Biryani', slug: 'chef-special-chicken-65-biryani', label: 'Chicken 65 Biryani' },
    { query: 'Benne Dosa Davanagere', slug: 'benne-masala-dosa', label: 'Benne Masala Dosa' },
    { query: 'Idli Vada Sambar plate', slug: 'idli-vada-combo', label: 'Idli Vada Combo' },
    { query: 'Mini Tiffin South Indian', slug: 'tiffin-1-mini-masala-dosa-idli-vada', label: 'Tiffin 1 Combo' }
  ];

  for (const t of targets) {
    await fetchAndProcess(t.query, t.slug, t.label);
    await sleep(1500);
  }
}

run().catch(console.error);

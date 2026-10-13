const sleep = ms => new Promise(r => setTimeout(r, ms));

async function searchCommons(query) {
  try {
    const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|mime|dimensions&format=json`;
    const res = await fetch(api, {
      headers: { 'User-Agent': 'TheBangaloreKitchenAudit/1.0 (https://bangalorekitchen.com; audit@bangalorekitchen.com)' }
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.query || !data.query.pages) return [];
    return Object.values(data.query.pages)
      .filter(p => p.imageinfo?.[0]?.mime?.startsWith('image/'))
      .map(p => ({
        title: p.title,
        url: p.imageinfo[0].url,
        width: p.imageinfo[0].width,
        height: p.imageinfo[0].height
      }));
  } catch (e) {
    return [];
  }
}

async function testAll() {
  const items = [
    { name: 'Soda', query: 'glass soda lemon ice' },
    { name: 'Sparkling Water', query: 'sparkling water glass' },
    { name: 'Mutton Donne Biryani', query: 'Donne Biryani' },
    { name: 'Benne Dosa', query: 'Benne Dosa' },
    { name: 'Set Dosa', query: 'Set Dosa' },
    { name: 'Idli Gravy', query: 'Idli Sambar South Indian' },
    { name: 'Idli Vada Combo', query: 'Idly Vada' },
    { name: 'Chicken Manchurian', query: 'Chicken Manchurian' },
    { name: 'Chicken Lollipop', query: 'Chicken Lollipop' },
    { name: 'Mutton Sukka', query: 'Mutton Sukka' },
    { name: 'Prawn Fry', query: 'Prawn pepper fry' },
    { name: 'Rava Masala Dosa', query: 'Rava Dosa Masala' },
    { name: 'Gujarati Thali', query: 'Gujarati Thali' },
    { name: 'Punjabi Thali', query: 'North Indian Thali' },
    { name: 'Hot and Sour Soup', query: 'Hot and sour soup' },
    { name: 'Cheese Dosa', query: 'Cheese Dosa' },
    { name: 'Paneer Dosa', query: 'Paneer Dosa' },
    { name: 'Masala Peanut', query: 'Peanut chaat masala' },
    { name: 'Family Feast Meal', query: 'Indian food feast table' }
  ];

  for (const item of items) {
    const res = await searchCommons(item.query);
    console.log(`[${item.name}] found: ${res.length}`);
    if (res.length > 0) {
      console.log(`   -> ${res[0].title} (${res[0].url})`);
    }
    await sleep(800);
  }
}

testAll().catch(console.error);

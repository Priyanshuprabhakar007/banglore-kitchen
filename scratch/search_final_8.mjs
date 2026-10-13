const sleep = ms => new Promise(r => setTimeout(r, ms));

async function searchCommons(query) {
  try {
    const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|mime|dimensions&format=json`;
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

async function run() {
  const queries = [
    { name: 'Sparkling Water', q: 'sparkling water lime glass' },
    { name: 'Sparkling Water 2', q: 'carbonated water glass ice' },
    { name: 'Chicken Manchurian', q: 'Manchurian chicken dish' },
    { name: 'Mutton Fry Sukka', q: 'Mutton fry South India' },
    { name: 'Goat Fry', q: 'Mutton Chukka' },
    { name: 'Masala Peanut', q: 'Peanut chaat' },
    { name: 'Masala Peanuts 2', q: 'Spicy roasted peanuts' },
    { name: 'Indian Feast', q: 'Indian cuisine banquet spread' },
    { name: 'Indian Table Spread', q: 'Indian thali feast table' },
    { name: 'Idli Curry', q: 'Idli with chicken curry' },
    { name: 'Set Dosa Gravy', q: 'Sponge Dosa' }
  ];

  for (const q of queries) {
    const results = await searchCommons(q.q);
    console.log(`[${q.name}] found ${results.length}`);
    results.forEach((r, idx) => {
      console.log(`   ${idx+1}. ${r.title} (${r.width}x${r.height}) -> ${r.url}`);
    });
    await sleep(800);
  }
}

run().catch(console.error);

async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|mime|dimensions&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'BangaloreKitchenBot/1.0 (culinary-audit)' } });
  const data = await res.json();
  if (!data.query || !data.query.pages) return [];
  return Object.values(data.query.pages).map(p => ({
    title: p.title,
    url: p.imageinfo?.[0]?.url,
    mime: p.imageinfo?.[0]?.mime,
    width: p.imageinfo?.[0]?.width,
    height: p.imageinfo?.[0]?.height
  }));
}

async function test() {
  const results = await searchCommons('Medu Vada');
  console.log('Medu Vada results:', results);
}

test().catch(console.error);

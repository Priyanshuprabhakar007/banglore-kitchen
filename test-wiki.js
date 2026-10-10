async function search(q) {
  const res = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&format=json&origin=*`);
  const data = await res.json();
  console.log(q, data.query?.pages ? Object.values(data.query.pages)[0].imageinfo[0].url : "null");
}
await search("Masala Dosa");
await search("Plain Dosa");
await search("Set Dosa");

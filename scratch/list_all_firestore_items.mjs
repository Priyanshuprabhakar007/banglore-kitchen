import fs from 'fs';

const menuItems = JSON.parse(fs.readFileSync('./scratch/firebase_menu_items.json', 'utf-8'));

console.log('--- ALL 111 FIRESTORE MENU ITEMS ---');
menuItems.forEach((d, i) => {
  console.log(`${(i+1).toString().padStart(3, '0')}. [${d.id}] "${d.name}" | Cat: ${d.categoryId || d.category} | CurrImg: ${d.imageUrl || 'NONE'}`);
});

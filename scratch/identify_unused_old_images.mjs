import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

// Function to recursively read all files in src
function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

const allSrcFiles = getAllFiles(srcDir);
const srcContents = allSrcFiles.map(f => fs.readFileSync(f, 'utf-8')).join('\n');

console.log('--- SCANNING FOR REFERENCES TO OLD IMAGE DIRECTORIES ---');

const dishesDir = path.join(process.cwd(), 'public', 'images', 'dishes');
const dishesFiles = fs.existsSync(dishesDir) ? fs.readdirSync(dishesDir) : [];

const menuDir = path.join(process.cwd(), 'public', 'images', 'menu');
const menuFiles = fs.existsSync(menuDir) ? fs.readdirSync(menuDir) : [];

const referencedDishes = [];
const unreferencedDishes = [];

for (const f of dishesFiles) {
  if (srcContents.includes(f) || srcContents.includes(`/images/dishes/${f}`)) {
    referencedDishes.push(f);
  } else {
    unreferencedDishes.push(f);
  }
}

const referencedMenu = [];
const unreferencedMenu = [];

for (const f of menuFiles) {
  if (srcContents.includes(f) || srcContents.includes(`/images/menu/${f}`)) {
    referencedMenu.push(f);
  } else {
    unreferencedMenu.push(f);
  }
}

console.log(`public/images/dishes: Total ${dishesFiles.length} files. Referenced in src: ${referencedDishes.length}, Unreferenced: ${unreferencedDishes.length}`);
console.log(`public/images/menu: Total ${menuFiles.length} files. Referenced in src: ${referencedMenu.length}, Unreferenced: ${unreferencedMenu.length}`);

fs.writeFileSync('./scratch/unused_images_report.json', JSON.stringify({
  dishesDir: {
    total: dishesFiles.length,
    referenced: referencedDishes,
    unreferencedCount: unreferencedDishes.length,
    sampleUnreferenced: unreferencedDishes.slice(0, 10)
  },
  menuDir: {
    total: menuFiles.length,
    referenced: referencedMenu,
    unreferencedCount: unreferencedMenu.length,
    files: unreferencedMenu
  }
}, null, 2));

console.log('Saved unused images analysis to scratch/unused_images_report.json');

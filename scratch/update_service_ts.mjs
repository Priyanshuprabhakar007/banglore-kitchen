import fs from 'fs';

const filePath = 'src/services/menuSyncService.ts';
let content = fs.readFileSync(filePath, 'utf8');

const newMap = fs.readFileSync('scratch/verified_local_ts.txt', 'utf8').trim();

// Locate export const VERIFIED_LOCAL_DISH_IMAGES: Record<string, string> = { ... };
const regex = /export const VERIFIED_LOCAL_DISH_IMAGES: Record<string, string> = \{[\s\S]*?\};/;

if (!regex.test(content)) {
  console.error('Could not find VERIFIED_LOCAL_DISH_IMAGES in file');
  process.exit(1);
}

content = content.replace(regex, newMap);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated VERIFIED_LOCAL_DISH_IMAGES in menuSyncService.ts');

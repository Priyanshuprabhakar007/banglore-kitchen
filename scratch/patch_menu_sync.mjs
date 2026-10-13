import fs from 'fs';

const verifiedMap = JSON.parse(fs.readFileSync('./scratch/verified_map.json', 'utf-8'));
const filePath = 'src/services/menuSyncService.ts';
let code = fs.readFileSync(filePath, 'utf-8');

const mapCode = `export const VERIFIED_LOCAL_DISH_IMAGES: Record<string, string> = ${JSON.stringify(verifiedMap, null, 2)};\n\n`;

// Replace getDishImageUrl function
const targetFunction = `export function getDishImageUrl(name: string): string {
  if (!name) return '';
  const clean = name.replace(/^authentic\\s+/gi, '').trim();
  if (DISH_UNSPLASH_IMAGES[name]) return DISH_UNSPLASH_IMAGES[name];
  if (DISH_UNSPLASH_IMAGES[clean]) return DISH_UNSPLASH_IMAGES[clean];
  
  const rawSlug = getDishSlug(name);
  return \`/images/dishes/\${rawSlug}-1200.webp\`;
}`;

const newFunction = `${mapCode}export function getDishImageUrl(name: string): string {
  if (!name) return '';
  const clean = name.replace(/^authentic\\s+/gi, '').trim();
  
  // 1. Check verified dedicated local photography first
  if (VERIFIED_LOCAL_DISH_IMAGES[name]) return VERIFIED_LOCAL_DISH_IMAGES[name];
  if (VERIFIED_LOCAL_DISH_IMAGES[clean]) return VERIFIED_LOCAL_DISH_IMAGES[clean];
  
  // 2. Do not return generic Samosas/Chicken 65 duplicates or repeated Unsplash photos
  return '';
}`;

if (code.includes('export function getDishImageUrl(name: string): string {')) {
  const startIdx = code.indexOf('export function getDishImageUrl(name: string): string {');
  const endIdx = code.indexOf('export const REFERENCE_CATEGORIES = [');
  if (startIdx !== -1 && endIdx > startIdx) {
    code = code.slice(0, startIdx) + newFunction + '\n\n' + code.slice(endIdx);
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log('Successfully updated getDishImageUrl with VERIFIED_LOCAL_DISH_IMAGES in menuSyncService.ts');
  } else {
    console.error('Indices not found');
  }
} else {
  console.error('Function declaration not found');
}

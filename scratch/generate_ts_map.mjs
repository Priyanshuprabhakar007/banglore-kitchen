import fs from 'fs';

const mapping = JSON.parse(fs.readFileSync('scratch/all_111_verified_mapping.json', 'utf8'));

let ts = `export const VERIFIED_LOCAL_DISH_IMAGES: Record<string, string> = {\n`;
const sortedKeys = Object.keys(mapping).sort();
for (const key of sortedKeys) {
  ts += `  ${JSON.stringify(key)}: ${JSON.stringify(mapping[key])},\n`;
}
ts += `};\n`;

fs.writeFileSync('scratch/verified_local_ts.txt', ts, 'utf8');
console.log(`Generated TS mapping for ${sortedKeys.length} items.`);

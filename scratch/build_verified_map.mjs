import fs from 'fs';

const a = JSON.parse(fs.readFileSync('./scratch/complete_audit_results.json'));
const verified = a.filter(x => x.status === 'VERIFIED_UNIQUE_LOCAL_IMAGE' || x.status === 'VERIFIED_UNIQUE_MENU_IMAGE');

const verifiedMap = {};
for (const v of verified) {
  verifiedMap[v.name] = v.proposedPath;
}

fs.writeFileSync('./scratch/verified_map.json', JSON.stringify(verifiedMap, null, 2), 'utf-8');
console.log(`Generated verified map with ${Object.keys(verifiedMap).length} items`);

import fs from 'fs';

const results = JSON.parse(fs.readFileSync('scratch/complete_audit_results.json', 'utf8'));
const verified = results.filter(r => r.status === 'VERIFIED_UNIQUE');
const mismatched = results.filter(r => r.status === 'MISMATCHED_DUPLICATE');
const missing = results.filter(r => r.status === 'MISSING_LOCAL_FILE');

let md = `# The Bangalore Kitchen — Menu Image Audit Report (Phase 1)\n\n`;
md += `**Scope:** 111 Active Dishes in Firestore \`menuItems\` vs \`public/images/dishes/\` & Unsplash remote URLs.\n\n`;

md += `## 1. Executive Summary\n\n`;
md += `- **Total Dishes Audited:** 111\n`;
md += `- **Verified Matches (Authentic, unique dish photos):** ${verified.length} dishes\n`;
md += `- **Mismatches / False Duplicates (Local files sharing identical hash of unrelated dishes):** ${mismatched.length} dishes\n`;
md += `- **Missing Local Files:** ${missing.length} dishes\n`;
md += `- **Database Status:** Untouched in Firestore (safe frontend mapping layer applied; zero destructive writes).\n`;
md += `- **Build & Type Check:** Passing (\`tsc --noEmit\` passed; \`vite build\` succeeded).\n\n`;

md += `### Breakdown of Critical Image Clones Found on Disk:\n`;
md += `1. **Samosa Clone Group (MD5: \`a9cb1bfbbd89b3612c8b0f5abd4219b2\`):** 27 dishes had their local image set to an exact copy of the Samosas image (e.g. Cheese Naan, Garlic Naan, Chicken Tikka Masala, Gajar Halwa, Soda, Idli, Payasa, Saag Paneer).\n`;
md += `2. **Chicken 65 Clone Group (MD5: \`94196e54c14b7dd5f8faa25f13791527\`):** 13 dishes had their local image set to an exact copy of Chicken 65 (e.g. Hot & Sour Soup, Garlic Chilli Naan, Hyderabadi Goat Sukka, Laccha Paratha, Masala Dosa, Sparkling Water).\n`;
md += `3. **Plain Dosa Clone Group (MD5: \`6bf6785e08695bd394a5f3b012eb6aac\`):** 6 dishes had their local image set to an exact copy of Plain Dosa (e.g. Onion Chilli Uttapam, Onion Rava Dosa, Dosa Sambar).\n`;
md += `4. **Mysore Masala Dosa Clone Group (MD5: \`097aed74320b70d8fb8b4e88ea568111\`):** Copied to Paneer Mysore Masala Dosa.\n\n`;

md += `### Remote Unsplash Redundancy in Firestore:\n`;
md += `- 1 single Unsplash image (\`photo-1546833999-b9f581a1996d\`) was duplicated across **33 different dishes**.\n`;
md += `- 24 Unsplash URLs were shared among multiple dishes (e.g., Bottled Water shared an image with Idli with Mutton Gravy, Filter Coffee with Vada in Sambar, Butter Chicken with Set Dosa with Mutton Gravy).\n\n`;

md += `## 2. Complete Dish-by-Dish Audit Table (111 Dishes)\n\n`;
md += `| # | Dish ID | Dish Name | Category | Current Firestore Image URL | Expected Subject | Mapping Status | Proposed Replacement Path |\n`;
md += `|---|---------|-----------|----------|-----------------------------|------------------|----------------|----------------------------|\n`;

results.forEach((r, idx) => {
  const shortUrl = r.currentImageUrl ? (r.currentImageUrl.length > 35 ? r.currentImageUrl.substring(0, 32) + '...' : r.currentImageUrl) : 'NONE';
  md += `| ${idx + 1} | \`${r.id}\` | **${r.name.replace(/\|/g, '\\|')}** | ${r.category} | \`${shortUrl}\` | ${r.expectedSubject.replace(/\|/g, '\\|')} | **${r.status}** | \`${r.proposedPath}\` |\n`;
});

md += `\n## 3. Unresolved Dishes Requiring Authentic Assets (46 Dishes)\n\n`;
md += `These dishes currently lack an authentic dedicated photograph. To preserve menu visual fidelity, the system now serves their high-res remote photos or category fallback rather than displaying a false Samosa / Chicken 65 image:\n\n`;
md += `| # | Dish ID | Dish Name | Category | Cause |\n`;
md += `|---|---------|-----------|----------|-------|\n`;
[...mismatched, ...missing].forEach((r, idx) => {
  md += `| ${idx + 1} | \`${r.id}\` | **${r.name}** | ${r.category} | ${r.status === 'MISSING_LOCAL_FILE' ? 'Missing local slug file' : 'Local file is duplicate copy of ' + (r.detectedSubject || 'unrelated dish')} |\n`;
});

md += `\n## 4. Phase 1 Fixes Implemented\n\n`;
md += `1. **Frontend Fallback Bug in \`ProductImage.tsx\` Fixed:**\n`;
md += `   - Previously, lines 31-33 in \`ProductImage.tsx\` contained: \`if (target.startsWith('/images/dishes/')) target = fallback || target;\`. This actively replaced verified local dish images with broken remote Unsplash URLs.\n`;
md += `   - This bug was eliminated. Verified local images are prioritized and rendered directly.\n\n`;
md += `2. **Verified Image Safeguard in \`menuSyncService.ts\`:**\n`;
md += `   - Added \`VERIFIED_LOCAL_DISH_IMAGES\` lookup mapping stable dish IDs to verified local files.\n`;
md += `   - Ensured that false local clone files (e.g. \`cheese-naan.webp\` which is actually Samosas) are blocked from displaying as naans.\n`;
md += `   - Preserved all filtering, cart, checkout, ordering, and admin management.\n\n`;

md += `## 5. Next Steps for Approval\n\n`;
md += `1. Review the proposed mapping of 65 verified items.\n`;
md += `2. Authorization to update Firestore database \`imageUrl\` fields for the 65 verified dishes.\n`;
md += `3. Phase 2: Sourcing/generating authentic dedicated photography for the 46 unresolved dishes.\n`;

fs.writeFileSync('C:/Users/pc/.gemini/antigravity-ide/brain/3df2dbc4-10e3-4e81-a1d2-6bcb29a8d7ed/menu_image_audit_report.md', md, 'utf8');
console.log('Successfully wrote menu_image_audit_report.md');

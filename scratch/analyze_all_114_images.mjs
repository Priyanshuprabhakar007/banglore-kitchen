import fs from 'fs';
import path from 'path';

const imageDir = path.join(process.cwd(), 'banglore kitchen menu images');
const localFiles = fs.readdirSync(imageDir).filter(f => f.endsWith('.webp'));
const menuItems = JSON.parse(fs.readFileSync('./scratch/firebase_menu_items.json', 'utf-8'));

function cleanText(s) {
  return (s || '')
    .toLowerCase()
    .replace(/^(\d{3}-)/, '')
    .replace(/\.webp$/, '')
    .replace(/^authentic\s+/gi, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

console.log('--- DETAILED COMPARISON REPORT ---');

const analysis = localFiles.map((file, idx) => {
  const num = file.substring(0, 3);
  const namePart = file.replace(/^\d{3}-/, '').replace(/\.webp$/, '');
  const cleanLocal = cleanText(file);

  // Find all potential dish candidates from Firestore
  const candidates = menuItems.map(d => {
    const cleanDish = cleanText(d.name);
    let score = 0;
    let reason = '';

    if (cleanDish === cleanLocal) {
      score = 100;
      reason = 'EXACT_MATCH';
    } else {
      // Check variations: e.g. "lachha" vs "laccha"
      const s1 = cleanDish.replace(/cch/g, 'chh');
      const s2 = cleanLocal.replace(/cch/g, 'chh');
      if (s1 === s2) {
        score = 98;
        reason = 'SPELLING_VARIANT';
      } else if (cleanDish.includes(cleanLocal) || cleanLocal.includes(cleanDish)) {
        score = 70;
        reason = 'SUBSTRING';
      } else {
        // Word overlap
        const w1 = cleanDish.split(' ');
        const w2 = cleanLocal.split(' ');
        const common = w1.filter(w => w2.includes(w) && !['style', 'veg', 'non'].includes(w));
        if (common.length >= 2) {
          score = 50 + common.length * 10;
          reason = `SHARED_WORDS: ${common.join(',')}`;
        }
      }
    }

    return { dish: d, score, reason };
  }).filter(c => c.score > 0).sort((a, b) => b.score - a.score);

  return {
    index: idx + 1,
    file,
    cleanLocal,
    bestCandidate: candidates[0] || null,
    candidates: candidates.slice(0, 3)
  };
});

fs.writeFileSync('./scratch/local_images_analysis.json', JSON.stringify(analysis, null, 2));

// Summary of best candidates
analysis.forEach(a => {
  if (a.bestCandidate && a.bestCandidate.score >= 90) {
    console.log(`[MATCH] ${a.file} -> "${a.bestCandidate.dish.name}" (${a.bestCandidate.dish.categoryId}) [${a.bestCandidate.reason}]`);
  } else if (a.bestCandidate && a.bestCandidate.score >= 50) {
    console.log(`[CANDIDATE] ${a.file} -> "${a.bestCandidate.dish.name}" (${a.bestCandidate.dish.categoryId}) [score=${a.bestCandidate.score}, ${a.bestCandidate.reason}]`);
  } else {
    console.log(`[EXTRA/NO_MATCH] ${a.file}`);
  }
});

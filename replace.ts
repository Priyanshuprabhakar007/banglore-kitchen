import fs from 'fs';
import path from 'path';

const dir = './src';

function walk(dirPath: string) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css') || fullPath.endsWith('.html')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Brand Replacements
        content = content.replace(/Basant Vegetarian/gi, 'The Bangalore Kitchen');
        content = content.replace(/Basant Restaurant/gi, 'The Bangalore Kitchen');
        content = content.replace(/Basant/g, 'Bangalore'); // case-sensitive exact
        content = content.replace(/basant-maroon/g, 'bangalore-primary');
        content = content.replace(/basant-red/g, 'bangalore-primary');
        content = content.replace(/basant-saffron/g, 'bangalore-accent');
        content = content.replace(/basant-gold/g, 'bangalore-accent');
        content = content.replace(/basant-orange/g, 'bangalore-accent');
        content = content.replace(/basant-cream/g, 'bangalore-card-alt');
        content = content.replace(/basant-beige/g, 'bangalore-border');
        content = content.replace(/basant-offwhite/g, 'bangalore-ivory');
        content = content.replace(/basant-dark/g, 'bangalore-text');
        content = content.replace(/basant-green/g, 'green-600');
        
        // Rupees to dollars
        // Replace ₹ with $
        content = content.replace(/₹/g, '$');
        
        fs.writeFileSync(fullPath, content);
    }
  }
}

walk(dir);
console.log('Replacements completed.');

import fs from 'fs';

const completeResults = JSON.parse(fs.readFileSync('scratch/complete_audit_results.json', 'utf8'));
const upgradedDishes = completeResults.filter(d => d.status !== 'VERIFIED_UNIQUE_LOCAL_IMAGE');

const galleryItems = upgradedDishes.map((d, index) => {
  let clean = d.name.toLowerCase().trim()
    .replace(/^authentic\s+/gi, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const upgradedPath = `/images/dishes/${clean}-1200.webp`;

  return {
    id: d.dishId,
    name: d.name,
    category: d.category,
    price: d.price,
    previousImageUrl: d.currentImageUrl,
    previousDescription: d.genericLocalDescription || (d.isDuplicateRemote ? `Shared remote Unsplash URL (used across ${d.remoteDuplicateCount} dishes)` : 'Incorrect image'),
    upgradedImagePath: upgradedPath,
    expectedSubject: d.expectedSubject,
    reason: d.reason,
     culinaryNotes: getCulinaryNotes(d.name, d.category)
  };
});

function getCulinaryNotes(name, category) {
  const notes = {
    'Cheese Naan': 'Freshly baked tandoori naan stuffed with stretchy melted cheese, brushed with butter and fresh cilantro.',
    'Garlic Chilli Naan': 'Tandoor bubbly naan infused with roasted garlic, fiery sliced green chillies, and cilantro with ghee.',
    'Garlic Naan': 'Teardrop tandoor flatbread with caramelized minced garlic, butter glaze, and delicate char.',
    'Laccha Paratha': 'Crisp multi-layered concentric spiral whole wheat flaky flatbread cooked with clarified desi ghee.',
    'Gajar Halwa': 'Warm slow-simmered grated Delhi red carrots cooked in milk, mawa, ghee, garnished with pistachios & cashews.',
    'Payasa': 'Creamy South Indian semiya vermicelli payasam infused with saffron, cardamom, and ghee-fried cashews.',
    'Chicken Tikka Masala': 'Smoky chargrilled chicken tikka pieces in a rich, creamy spiced tomato butter sauce with cream swirl.',
    'Cochin Prawn/Shrimp Curry': 'Plump prawns in an authentic Kerala yellow coconut milk curry with kokum, curry leaves, and mustard seeds.',
    'Paneer Butter Masala': 'Soft paneer cubes in velvety smooth makhani tomato-cashew gravy with melting butter pat.',
    'Pappu (Nagarjuna style)': 'Andhra toor dal cooked with spinach, topped with sizzling garlic, red chilli, and curry leaf tadka.',
    'Saag Paneer': 'Golden pan-seared paneer cubes in rich spiced puree of tender spinach and mustard greens.',
    'Gobi Manchurian': 'Crisp cauliflower florets in dark glossy Indo-Chinese garlic, ginger, and scallion glaze.',
    'Masala Dosa': 'Crispy golden Bengaluru crepe folded over spiced potato onion masala, served with coconut chutney.',
    'Idli': 'Traditional fluffy steamed rice-lentil cakes served with freshly grated coconut chutney and sambar.',
    'Medu Vada': 'Golden-brown crisp lentil doughnut fritters with crunchy exterior and light interior.',
    'Dosa Sambar': 'Crisp golden crepe served with a steaming bowl of spiced lentil and vegetable sambar.',
    'Onion Rava Dosa': 'Lacy, crispy net-textured semolina crepe studded with diced red onions and curry leaves.',
    'Plain Rava Dosa': 'Ultra-crispy golden semolina net crepe roasted with ghee.',
    'Bisibele Bath': 'Signature Karnataka hot lentil rice preparation tempered with ghee, spices, and crisp boondi.',
    'Onion Chilli Uttapam': 'Thick fluffy fermented rice pancake generously topped with caramelized onions and green chillies.',
    'Onion Pakoda': 'Crunchy deep-fried golden onion fritters seasoned with ajwain, curry leaves, and chillies.',
    'Masala Papad': 'Roasted poppadom loaded with diced onions, juicy tomatoes, fresh herbs, and tangy chaat masala.',
    'Masala Puri': 'Bangalore street food classic of crushed puris drenched in hot spicy dried pea gravy and sev.',
    'Chef Special Chicken 65 Biryani': 'Fragrant spiced biryani topped with crispy spiced Chicken 65 morsels and caramelized onions.',
    'Bangalore Mutton Donne Biryani': 'Authentic herbal green Seeraga Samba rice biryani packed with tender mutton pieces.',
    'Chicken Lollipop': 'Indo-Chinese frenched chicken winglets coated in spicy crimson batter, crisp-fried.',
    'Prawn Pepper Fry': 'Coastal succulent prawns dry-tossed with freshly cracked black pepper and fried curry leaves.',
    'Onion Rava Masala Dosa': 'Crispy lacy semolina dosa filled with savory spiced potato bhaji and caramelized onions.',
    'Mild Gujrati Thali': 'Vegetarian Gujarati thali spread with sweet dal, kadhi, rotli, khichdi, and seasonal vegetables.',
    'Punjabi Thali': 'Hearty North Indian thali feast featuring dal makhani, paneer curry, tandoori bread, and rice.',
    'Chicken Hot and Sour Soup': 'Steaming Indo-Chinese broth with shredded chicken, mushrooms, vinegar, and white pepper.',
    'Cheese Dosa': 'Crisp golden dosa filled with gooey melted cheese.',
    'Cheese Mysore Masala Dosa': 'Mysore dosa layered with fiery red chutney, potato masala, and rich melted cheese.',
    'Paneer Mysore Masala Dosa': 'Mysore dosa filled with red garlic chutney, spiced crumbled paneer, and potatoes.',
    'Soda': 'Chilled sparkling club soda served with fresh lime wedge and clear ice.',
    'Sparkling Water': 'Effervescent mineral water served chilled in elegant glassware with lemon slice.',
    'Benne Masala Dosa': 'Crispy Davanagere style butter dosa served with potato palya and white butter.',
    'Idli Vada Combo': 'Platter pairing two soft steamed idlis and one crispy medu vada with sambar.',
    'Tiffin 1 - Mini Masala Dosa, Idli & Vada': 'Complete South Indian tiffin combo with mini masala dosa, idli, vada, and chutneys.',
    'Set Dosa with Chicken Gravy': 'Sponge-soft set dosas served with rich South Indian spicy chicken gravy.',
    'Idli with Chicken Gravy': 'Steamed idlis served with fragrant chicken salna curry.',
    'Idli with Mutton Gravy': 'Steamed idlis accompanied by slow-simmered spicy mutton gravy.',
    'Chicken Manchurian Gravy': 'Tender chicken meatballs in dark, savory garlic-ginger scallion sauce.',
    'Hyderabadi Goat Sukka': 'Slow-roasted bone-in goat meat tossed with caramelized onions and roasted spices.',
    'Masala Peanut': 'Crunchy roasted peanuts tossed with diced red onions, tomatoes, coriander, and lemon.',
    '7 Family Combo Meals ': 'Lavish Indian dining feast table spread with an assortment of biryanis, curries, and breads.'
  };

  return notes[name] || `Authentic ${name} culinary presentation.`;
}

fs.writeFileSync('scratch/gallery_items.json', JSON.stringify(galleryItems, null, 2), 'utf8');
console.log(`Saved ${galleryItems.length} gallery items to scratch/gallery_items.json`);

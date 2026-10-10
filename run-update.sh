cp firestore.rules firestore.rules.bak
sed -i 's/allow write: if true;/allow write: if true;/g' firestore.rules
# wait, menuItems is actually already 'allow write: if true;' in the rules I checked:
# match /menuItems/{itemId} { allow read: if true; allow write: if true; }

import { initializeApp } from "firebase/app";
import { initializeFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
};

const app = initializeApp(firebaseConfig);

let databaseId = config.firestoreDatabaseId || '(default)';

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, databaseId);

async function run() {
  const ref = doc(db, "settings", "homeBanner");
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    console.log("Current data:", snapshot.data());
    const data = snapshot.data();
    if (data.title && (data.title.includes("authetnic") || data.title.includes("flacours"))) {
      let newTitle = data.title.replace(/authetnic/gi, "Authentic");
      newTitle = newTitle.replace(/flacours/gi, "flavors");
      await updateDoc(ref, { title: newTitle });
      console.log("Updated title to:", newTitle);
    } else {
        console.log("No typo found. Actual title:", data.title);
    }
  } else {
    console.log("Document does not exist");
  }
}
run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });

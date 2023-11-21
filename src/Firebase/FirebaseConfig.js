import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgxamUeABc0EbtVCvZ_Drl7N2fAqWHEWc",
  authDomain: "nrc-app-8f595.firebaseapp.com",
  projectId: "nrc-app-8f595",
  storageBucket: "nrc-app-8f595.appspot.com",
  messagingSenderId: "590784718557",
  appId: "1:590784718557:web:36f5836224218796855d34",
  measurementId: "G-LPV5PR8B1V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const collectionRef = db.collection('users');

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

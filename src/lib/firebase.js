import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAs4JbQlwSMb8A3Aobgk5ImK4ImoAYM4io",
  authDomain: "roman-exchange.firebaseapp.com",
  projectId: "roman-exchange",
  storageBucket: "roman-exchange.firebasestorage.app",
  messagingSenderId: "999611126669",
  appId: "1:999611126669:web:eb5abdb3a2de321c6623c4"
};

// Initialize Firebase only if it hasn't been initialized yet (Next.js SSR hot reloading fix)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

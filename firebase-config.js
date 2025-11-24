// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// PASTE CONFIG KAMU DI SINI (dari Step 5)
const firebaseConfig = {
  apiKey: "AIzaSyBznlpKDOjC-ldEsrO7kplSQHkMqi6zq1A",
  authDomain: "website-ti-uns.firebaseapp.com",
  projectId: "website-ti-uns",
  storageBucket: "website-ti-uns.firebasestorage.app",
  messagingSenderId: "293357049714",
  appId: "1:293357049714:web:72c1513651bcb7179aefeb",
  measurementId: "G-DBK61KTXNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export untuk dipakai file lain
export { auth, db, storage, signInWithEmailAndPassword, signOut, onAuthStateChanged, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, ref, uploadBytes, getDownloadURL };
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, setDoc, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjvhiikT-e_JFifBz2Sctoj0J32B0myc8",
  authDomain: "eva-site-5e0c8.firebaseapp.com",
  projectId: "eva-site-5e0c8",
  storageBucket: "eva-site-5e0c8.firebasestorage.app",
  messagingSenderId: "937271272134",
  appId: "1:937271272134:web:6d9a7f3f64f8da9ef3adc7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, onAuthStateChanged, db, updateDoc, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, collection, addDoc, getDoc, getDocs, deleteDoc, setDoc, doc, where, query };
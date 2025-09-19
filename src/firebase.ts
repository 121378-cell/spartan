import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC20dDNE6L6A-ohpj3IBsTk8ecYnHCExw8",
  authDomain: "spartan-v5.firebaseapp.com",
  projectId: "spartan-v5",
  storageBucket: "spartan-v5.appspot.com", // Corrected storage bucket
  messagingSenderId: "563008212681",
  appId: "1:563008212681:web:7792b9698d29e2ddf08718"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
  
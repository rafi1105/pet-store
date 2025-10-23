// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUMMnENE0ZPxFwbc3ih4JaIyN_iWSVUHA",
  authDomain: "pet-shop-a8c2f.firebaseapp.com",
  projectId: "pet-shop-a8c2f",
  storageBucket: "pet-shop-a8c2f.firebasestorage.app",
  messagingSenderId: "333860428249",
  appId: "1:333860428249:web:3b475b8f0e3dfa924de1c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

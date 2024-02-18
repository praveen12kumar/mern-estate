// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-3d818.firebaseapp.com",
  projectId: "mern-estate-3d818",
  storageBucket: "mern-estate-3d818.appspot.com",
  messagingSenderId: "176216865855",
  appId: "1:176216865855:web:b37f3ddca8ba28a11c0c8a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
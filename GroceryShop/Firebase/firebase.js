// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ4NqM28Jw1gTRHhSZg-_uQAVBpbN-HDE",
  authDomain: "price-comparison-82960.firebaseapp.com",
  projectId: "price-comparison-82960",
  storageBucket: "price-comparison-82960.appspot.com",
  messagingSenderId: "937310240268",
  appId: "1:937310240268:web:dc95dc5b0d164c019cb829",
  measurementId: "G-PSJC9M859Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {app, database}
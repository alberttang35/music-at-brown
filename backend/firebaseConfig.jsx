// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Import necessary SDKs
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB11lzVlpcfJPkiVEAb1bk3Zyvgi4dRpfw",
  authDomain: "cs32-final-project-75d38.firebaseapp.com",
  projectId: "cs32-final-project-75d38",
  storageBucket: "cs32-final-project-75d38.appspot.com",
  messagingSenderId: "610331656289",
  appId: "1:610331656289:web:9d2339145f265c197caa20",
  measurementId: "G-EYQJFHGK7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
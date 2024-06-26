// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7CkPB-__Oz--3XCv6dkzYf7nazTALnjg",
  authDomain: "project2-b42ab.firebaseapp.com",
  projectId: "project2-b42ab",
  storageBucket: "project2-b42ab.appspot.com",
  messagingSenderId: "514601772661",
  appId: "1:514601772661:web:e05b81ed5c35b7d73afa3c",
  measurementId: "G-XEJ2JDF4B4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

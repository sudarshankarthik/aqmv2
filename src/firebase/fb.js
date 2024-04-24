// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4qH3yEMqW1HeqlgxJw31XgjCvBmkgM5M",
  authDomain: "aqmv2-9a93b.firebaseapp.com",
  databaseURL: "https://aqmv2-9a93b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aqmv2-9a93b",
  storageBucket: "aqmv2-9a93b.appspot.com",
  messagingSenderId: "120872784182",
  appId: "1:120872784182:web:807405d5eede1bbd2a2397",
  measurementId: "G-Q8LCFLRXQD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestoreDB = initializeFirestore(app, 
  {localCache: 
    persistentLocalCache(/*settings*/{tabManager: persistentMultipleTabManager()})
  });
export const db = getDatabase(app)
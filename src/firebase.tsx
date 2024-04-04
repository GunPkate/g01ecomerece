// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// userToken: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuKWJ8iDBufYBapPGSCtUD9jrzNG7EpBE",
  authDomain: "g0-ecommerce.firebaseapp.com",
  projectId: "g0-ecommerce",
  storageBucket: "g0-ecommerce.appspot.com",
  messagingSenderId: "657096575463",
  appId: "1:657096575463:web:18e828a910113817541542"
};

// Initialize Firebase
const app:FirebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const auth:Auth = getAuth(app);
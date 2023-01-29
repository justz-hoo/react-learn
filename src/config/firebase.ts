// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP7L7fL5xe1ob4Cnqe5m5hPElZePlYTA8",
  authDomain: "react-course-d5cee.firebaseapp.com",
  projectId: "react-course-d5cee",
  storageBucket: "react-course-d5cee.appspot.com",
  messagingSenderId: "496483092405",
  appId: "1:496483092405:web:cd944f1762a56bd3517bfc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

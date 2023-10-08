// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACg1M3_hJMFgRkv1-glQ5tdzxW-2pGa70",
  authDomain: "student-management-463d7.firebaseapp.com",
  projectId: "student-management-463d7",
  storageBucket: "student-management-463d7.appspot.com",
  messagingSenderId: "913188050905",
  appId: "1:913188050905:web:955f26dd2b0ba1a829abc8",
  measurementId: "G-H3E1BRRYLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const Count = collection(db, "student");
export const attendence = collection(db, "courses");

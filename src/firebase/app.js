// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const authDomain = process.env.AIzaSyAV87iJlqNYvYrl_TMchYhQn6_fZIqrn3U

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey ,
  authDomain: authDomain,
  projectId: "authenticationpractice-9fc3b",
  storageBucket: "authenticationpractice-9fc3b.appspot.com",
  messagingSenderId: "1052866085219",
  appId: "1:1052866085219:web:119b1b013ad71d90439356",
  measurementId: "G-28VZSL0X8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {db}

export default app;
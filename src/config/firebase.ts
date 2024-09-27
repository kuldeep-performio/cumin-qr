// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.PUBLIC_GOOGLE_ANALYTICS,
  authDomain: "cuminqr-d8569.firebaseapp.com",
  projectId: "cuminqr-d8569",
  storageBucket: "cuminqr-d8569.appspot.com",
  messagingSenderId: "1089929845202",
  appId: "1:1089929845202:web:9c9a158ef1ec00e7be900b",
  databaseURL: "https://cuminqr-d8569-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase
// if (!getApps().length) {
//     initializeApp(firebaseConfig);
// }
// Initialize Firebase auth
export const auth = getAuth();

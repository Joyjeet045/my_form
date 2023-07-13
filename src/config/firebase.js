import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBOOoVlon80HkcvIlfKuT3ZIsCOhVdbwVQ",
  authDomain: "form-firebase-6fb12.firebaseapp.com",
  projectId: "form-firebase-6fb12",
  storageBucket: "form-firebase-6fb12.appspot.com",
  messagingSenderId: "823435546109",
  appId: "1:823435546109:web:fe693e4337f045f2ae9d94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
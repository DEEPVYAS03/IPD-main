import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyB72ZsKz3VCQcH882X185GKKw-a7dDwy98",
  authDomain: "react-auth-e6ac7.firebaseapp.com",
  projectId: "react-auth-e6ac7",
  storageBucket: "react-auth-e6ac7.appspot.com",
  messagingSenderId: "790196493117",
  appId: "1:790196493117:web:8a868b8f2b7963e91f8354",
  measurementId: "G-YWWE9K8BVD"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export default app



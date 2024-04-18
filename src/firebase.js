import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADEpze-xc1NUqXIncIJOItLqkHiD2gCkg",
  authDomain: "pg-huntz-8043b.firebaseapp.com",
  projectId: "pg-huntz-8043b",
  storageBucket: "pg-huntz-8043b.appspot.com",
  messagingSenderId: "1034810940190",
  appId: "1:1034810940190:web:26fb0099fd340fb166070f",
  measurementId: "G-85EYVW01GQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

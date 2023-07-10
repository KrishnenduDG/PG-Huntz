import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_w_cG9Co7J8s8hGWkh6xyuMdpXe3POCc",
  authDomain: "pg-huntz-main.firebaseapp.com",
  projectId: "pg-huntz-main",
  storageBucket: "pg-huntz-main.appspot.com",
  messagingSenderId: "297626407000",
  appId: "1:297626407000:web:e18de7b9dd8f1cd3a9fa2d",
  measurementId: "G-YTX8EF3RCG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
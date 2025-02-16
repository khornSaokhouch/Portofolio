import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7kgRVwjwHXECYyljjFD4ghbudeIEa5_8",
  authDomain: "bookingtour-9b1c1.firebaseapp.com",
  projectId: "bookingtour-9b1c1",
  storageBucket: "bookingtour-9b1c1.firebasestorage.app",
  messagingSenderId: "550387880346",
  appId: "1:550387880346:web:481472ed99a6d81aaa2a23",
  measurementId: "G-FXWLKFZRPY"
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };
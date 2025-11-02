import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDYh4N6gJ-LmZ5DHdkc8M6SoY_oiLodNS8",
    authDomain: "ned-teste.firebaseapp.com",
    projectId: "ned-teste",
    storageBucket: "ned-teste.firebasestorage.app",
    messagingSenderId: "724913742767",
    appId: "1:724913742767:web:c4cb60cd8b5e842329855a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


export { auth, db }
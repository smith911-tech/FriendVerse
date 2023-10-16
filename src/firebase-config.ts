// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAE1VFJF2vHnnIWrvi5GqeX4wJDDdH4K8",
    authDomain: "friend-verse.firebaseapp.com",
    projectId: "friend-verse",
    storageBucket: "friend-verse.appspot.com",
    messagingSenderId: "691190302930",
    appId: "1:691190302930:web:fff95f4f444222f0fa450b",
    measurementId: "G-QZZYHCMPH3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)

export{app, auth, db, storage}


//Mailchimp key
// 4af489558f6f0d3aecd63e0cb0234dd0-us8

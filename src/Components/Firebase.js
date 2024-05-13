// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDGhMpCRK7g2sg3c1T3h4ljIuDKoCSC4YQ",
    authDomain: "rova-a8ab1.firebaseapp.com",
    projectId: "rova-a8ab1",
    storageBucket: "rova-a8ab1.appspot.com",
    messagingSenderId: "788700947528",
    appId: "1:788700947528:web:c9643b12ff5117b067e47d",
    measurementId: "G-LVCLLP6ZZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };
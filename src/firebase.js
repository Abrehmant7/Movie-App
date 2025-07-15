import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnuRqTaEqmzJHG-MKyvgpUH5aXWImHMnU",
  authDomain: "moviesapp-a8f5e.firebaseapp.com",
  projectId: "moviesapp-a8f5e",
  storageBucket: "moviesapp-a8f5e.firebasestorage.app",
  messagingSenderId: "218953561123",
  appId: "1:218953561123:web:804d91daa229cfeb41ad96",
  measurementId: "G-2LDGFNE538"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };

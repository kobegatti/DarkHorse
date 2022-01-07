import firebase from "firebase";
import firestore from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq0yfsivqmGwSnD6p42giyTyLV7bgfQQM",
  authDomain: "dark-horse-850b7.firebaseapp.com",
  projectId: "dark-horse-850b7",
  storageBucket: "dark-horse-850b7.appspot.com",
  messagingSenderId: "59169977992",
  appId: "1:59169977992:web:62c1872394cfcbdc55d13d",
  measurementId: "G-TCZ218FMF9",
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;

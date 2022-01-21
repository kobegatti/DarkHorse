// import firebase from "firebase/app";
// import "firebase/auth";

import * as firebase from "firebase";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   sendPasswordResetEmail,
//   signOut,
// } from "firebase/auth";

// import {
//   getFirestore,
//   query,
//   getDocs,
//   collection,
//   where,
//   addDoc,
// } from "firebase/firestore";
// ​​import {
//   getAuth,
// ​​  signInWithPopup,
// ​​  signInWithEmailAndPassword,useAuthState,
// ​​  createUserWithEmailAndPassword,
// ​​  sendPasswordResetEmail,
// ​​  signOut,
// ​​} from "firebase/auth";
// ​​import {
// ​​  getFirestore,
// ​​  query,
// ​​  getDocs,
// ​​  collection,
// ​​  where,
// ​​  addDoc,
// ​​} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

let app;
if (firebase.app.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };

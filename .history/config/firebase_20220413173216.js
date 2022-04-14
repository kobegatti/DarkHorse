// import firebase from "firebase/app";
// import "firebase/auth";

import firebase from "firebase";
//import { arrayUnion } from "firebase/firestore";
// import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const union = db.FieldValue;
//const FieldValue = require("firebase-admin").firestore;
//const collection = firebase.firestore().collection("Users");

export { auth, db, union };

// const auth = firebase.auth(app);
// const db = firebase.firestore(app);

// const logInWithEmailAndPassword = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch {
//     console.error(err);
//     alert(err.message);
//   }
// };

// // TODO: check if user already has account
// const registerOwnerWithEmailAndPassword = async (username, email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     await addDoc(collection(db, "PetOwners"), {
//       uid: user.uid,
//       username,
//       authProvider: "local",
//       email,
//     });
//   } catch {
//     console.error(err);
//     alert(err.message);
//   }
// };

// const sendPasswordReset = async (email) => {
//   try {
//     await sendPasswordResetEmail(auth, email);
//     alert("Password reset link sent!");
//   } catch {
//     console.error(err);
//     alert(err.message);
//   }
// };

// const logOut = () => {
//   signOut(auth);
// };

// export default {
//   auth,
//   db,
//   logInWithEmailAndPassword,
//   registerOwnerWithEmailAndPassword,
//   sendPasswordReset,
//   logOut,
// };

// export default firebase;
// export default { auth, ownersCollection, profCollection };

// export const auth = app.auth();
// export default app;
// import firebase from "firebase";

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBq0yfsivqmGwSnD6p42giyTyLV7bgfQQM",
//   authDomain: "dark-horse-850b7.firebaseapp.com",
//   projectId: "dark-horse-850b7",
//   storageBucket: "dark-horse-850b7.appspot.com",
//   messagingSenderId: "59169977992",
//   appId: "1:59169977992:web:62c1872394cfcbdc55d13d",
//   measurementId: "G-TCZ218FMF9",
// };

// firebase.initializeApp(firebaseConfig);

// // const auth = firebase.auth();
// // const db = firebase.firestore();

// // const ownersCollection = db.collection("PetOwners");
// // const profCollection = db.collection("PetCareProfessionals");

// firebase.firestore();
// export default firebase;
// // export { auth, ownersCollection, profCollection };

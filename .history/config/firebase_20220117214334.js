import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:,
  projectId:,
  storageBucket:,
  messagingSenderId:,
  appId:

});

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

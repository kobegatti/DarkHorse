import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

// const auth = firebase.auth();
// const db = firebase.firestore();

// const ownersCollection = db.collection("PetOwners");
// const profCollection = db.collection("PetCareProfessionals");

export default firebase;
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

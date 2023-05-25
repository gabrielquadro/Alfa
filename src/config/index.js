// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCim_TCJXDX7W2N86trkLIlk3aZlu8odpQ",
//   authDomain: "mywarzone-73a32.firebaseapp.com",
//   projectId: "mywarzone-73a32",
//   storageBucket: "mywarzone-73a32.appspot.com",
//   messagingSenderId: "104852570597",
//   appId: "1:104852570597:web:b2c40a80d0b59f4b53af0c",
//   measurementId: "G-F7EWZQHWTE"
// };

// // Initialize Firebase
// export const firebase = initializeApp(firebaseConfig);

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB8hh4prTaaZAA1l8b0R-QC9pblok9Jhw4",
  authDomain: "solictacaoveiculo.firebaseapp.com",
  projectId: "solictacaoveiculo",
  storageBucket: "solictacaoveiculo.appspot.com",
  messagingSenderId: "744229720409",
  appId: "1:744229720409:web:f428f7893dbaca7bfcfc48",
  measurementId: "G-CNRZ5T2B8Z"
};


let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth()
const db = app.firestore();

export { db, auth };

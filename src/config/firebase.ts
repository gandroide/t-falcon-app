import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDv8WnnUMxrLtDVvotoVKuK7mfqjsQ_Gb4',
  authDomain: 't-falcon-app.firebaseapp.com',
  projectId: 't-falcon-app',
  storageBucket: 't-falcon-app.appspot.com',
  messagingSenderId: '654924976669',
  appId: '1:654924976669:web:3348120f2d07ca37c82cf4'
};

export const app = firebase.initializeApp(firebaseConfig).firestore();
export const appAuth = firebase.auth();
export const appTimestamp = firebase.firestore.Timestamp;

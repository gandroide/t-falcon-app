import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// CONFIG PRIMEIRA API
// const firebaseConfig = {
//   apiKey: 'AIzaSyDv8WnnUMxrLtDVvotoVKuK7mfqjsQ_Gb4',
//   authDomain: 't-falcon-app.firebaseapp.com',
//   projectId: 't-falcon-app',
//   storageBucket: 't-falcon-app.appspot.com',
//   messagingSenderId: '654924976669',
//   appId: '1:654924976669:web:3348120f2d07ca37c82cf4'
// };

//CONFIG API V2 PARA O NEW LAYOUT
const firebaseConfig = {
  apiKey: 'AIzaSyB5oHlerFheglE9n6eML-XwKHAa2ZSCJz8',
  authDomain: 'tfalcon-app-v2.firebaseapp.com',
  projectId: 'tfalcon-app-v2',
  storageBucket: 'tfalcon-app-v2.appspot.com',
  messagingSenderId: '447919007531',
  appId: '1:447919007531:web:e7e019f7edb82aeb95076e'
};

export const app = firebase.initializeApp(firebaseConfig).firestore();
export const appAuth = firebase.auth();
export const appTimestamp = firebase.firestore.Timestamp;
export const app2 = firebase.initializeApp(firebaseConfig, 'secondary').auth();

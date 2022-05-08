import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBqJCbzS9tD5KUEXI0hYCmeaYV77LTKbTs",
    authDomain: "t-falcon.firebaseapp.com",
    projectId: "t-falcon",
    storageBucket: "t-falcon.appspot.com",
    messagingSenderId: "742417808100",
    appId: "1:742417808100:web:1daa04f3ca689a87d5caf1",
    measurementId: "G-5CMG2KGNJ6"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
  
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCbALzKlJ9D2TAoVvZUCsgRPo_c92rRHIU",
    authDomain: "react-todo-aaef3.firebaseapp.com",
    projectId: "react-todo-aaef3",
    storageBucket: "react-todo-aaef3.appspot.com",
    messagingSenderId: "533985485787",
    appId: "1:533985485787:web:d41c50dd0760c1a1643dfe"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
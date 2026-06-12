
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "interviewagent-48aff.firebaseapp.com",
    projectId: "interviewagent-48aff",
    storageBucket: "interviewagent-48aff.firebasestorage.app",
    messagingSenderId: "44142336708",
    appId: "1:44142336708:web:0adcf528ca647c436b8791",
    measurementId: "G-MT1X3F67SK"
  };
 

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}
// firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCY6gVE_Qpq7z02Jh-Hu5qAUGsksPvxwwI",
    authDomain: "babyhang-ddea4.firebaseapp.com",
    projectId: "babyhang-ddea4",
    storageBucket: "babyhang-ddea4.appspot.com",
    messagingSenderId: "254641903918",
    appId: "1:254641903918:web:de3a09151c276b9cc802bf"
  };
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

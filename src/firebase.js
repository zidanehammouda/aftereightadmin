import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnkzBWDAEgflTJI-FFCrFDvWd6wndWogU",
  authDomain: "giftstoreapp123.firebaseapp.com",
  projectId: "giftstoreapp123",
  storageBucket: "giftstoreapp123.appspot.com",
  messagingSenderId: "902600481066",
  appId: "1:902600481066:web:c2bc06eeaccc3ad7c92653",
  measurementId: "G-YHTG6VMGHM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await setPersistence(auth, browserSessionPersistence).then(() =>
      signInWithEmailAndPassword(auth, email, password)
    );
  } catch (err) {
    return err;
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, logInWithEmailAndPassword, logout };

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9L1efADmVioWaqYbMtTeZGkUNE-W2Zzk",
  authDomain: "shopygo-33103.firebaseapp.com",
  projectId: "shopygo-33103",
  storageBucket: "shopygo-33103.appspot.com",
  messagingSenderId: "329719490113",
  appId: "1:329719490113:web:def0a7820f337faa67c8c0",
  measurementId: "G-XVY93TPF8J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookAuthProvider };

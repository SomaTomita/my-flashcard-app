// web app's Firebase configuration
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID
};
const app = initializeApp(firebaseConfig);

// firestore
import { getFirestore } from "firebase/firestore";
export const db = getFirestore(app);


//auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app);

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
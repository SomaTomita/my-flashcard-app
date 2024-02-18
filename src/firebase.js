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
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
export const auth = getAuth(app);

export const signup = async (email, password) => {
	await createUserWithEmailAndPassword(auth, email, password);
	await sendEmailVerification(auth.currentUser);
	return auth.currentUser;
};

export const signin = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const resendVerificationEmail = async () => {
	if (auth.currentUser) {
		await sendEmailVerification(auth.currentUser);
		return true;
	}
	return false;
};

export const watchAuthState = (onUserChanged) => {
	// ユーザーの認証状態を監視する関数
	return onAuthStateChanged(auth, onUserChanged);
};

export const resetPassword = (email) => {
	return sendPasswordResetEmail(auth, email);
}
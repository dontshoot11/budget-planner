import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
} from "firebase/auth";
import { setUserLoggedIn } from "../store/index";

const firebaseConfig = {
	apiKey: "AIzaSyDi115K8s-sGEDyrn7_v8CMsTsbZ19jxZU",
	authDomain: "budget-planner-420223.firebaseapp.com",
	projectId: "budget-planner-420223",
	databaseURL:
		"https://budget-planner-420223-default-rtdb.europe-west1.firebasedatabase.app/",
	storageBucket: "budget-planner-420223.appspot.com",
	messagingSenderId: "775169554812",
	appId: "1:775169554812:web:f3598cf84e43c971c2ccf9",
	measurementId: "G-Y07E397QDQ",
};
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);

export const googleLogin = () => {
	const provider = new GoogleAuthProvider();
	signInWithPopup(auth, provider)
		.then((result) => {
			console.log("User logged in successfully:", result.user);
		})
		.catch((error) => {
			console.error("Error during authentication:", error);
		});
};

onAuthStateChanged(auth, (user) => {
	if (user) {
		console.log("User is logged in:", user);
		setUserLoggedIn(true);
	} else {
		console.log("User is not logged in.");
		setUserLoggedIn(false);
	}
});

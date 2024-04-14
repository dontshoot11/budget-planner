import { createStore, createEvent, createEffect } from "effector";
import { ref, set, get } from "firebase/database";
import { database } from "../firebase/firebase";
import { getAuth } from "firebase/auth";

const savedDate = localStorage.getItem("savedDate") || "";
const savedBudget = localStorage.getItem("savedBudget") || "";
const userLoggedIn = false;

export const $date = createStore(savedDate);
export const $budget = createStore(savedBudget);
export const $userLoggedIn = createStore(userLoggedIn);

export const setDate = createEvent<string>();
export const setBudget = createEvent<string>();
export const setUserLoggedIn = createEvent<boolean>();

const saveDateToFirebase = createEffect(async (date: string) => {
	const auth = getAuth();
	const user = auth.currentUser;
	const userId = user ? user.uid : null;
	if (!userId) return;
	const dateRef = ref(database, `users/${userId}/savedDate`);
	await set(dateRef, date);
});

const saveBudgetToFirebase = createEffect(async (budget: string) => {
	const auth = getAuth();
	const user = auth.currentUser;
	const userId = user ? user.uid : null;
	if (!userId) return;
	const budgetRef = ref(database, `users/${userId}/savedBudget`);
	await set(budgetRef, budget);
});

export const fetchDateFromFirebase = createEffect(async () => {
	const auth = getAuth();
	const user = auth.currentUser;
	const userId = user ? user.uid : null;
	if (!userId) return;
	const dateRef = ref(database, `users/${userId}/savedDate`);
	const snapshot = await get(dateRef);
	return snapshot.val();
});

export const fetchBudgetFromFirebase = createEffect(async () => {
	const auth = getAuth();
	const user = auth.currentUser;
	const userId = user ? user.uid : null;
	if (!userId) return;
	const budgetRef = ref(database, `users/${userId}/savedBudget`);
	const snapshot = await get(budgetRef);
	return snapshot.val();
});

$date.on(setDate, (_, newValue) => newValue);
$budget.on(setBudget, (_, newValue) => newValue);
$userLoggedIn.on(setUserLoggedIn, (_, newValue) => newValue);

$date.on(fetchDateFromFirebase.doneData, (_, date) => date);
$budget.on(fetchBudgetFromFirebase.doneData, (_, budget) => budget);

$date.watch((newValue) => {
	localStorage.setItem("savedDate", newValue);
	saveDateToFirebase(newValue);
});

$budget.watch((newValue) => {
	localStorage.setItem("savedBudget", newValue);
	saveBudgetToFirebase(newValue);
});

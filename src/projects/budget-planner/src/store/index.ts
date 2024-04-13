import { createStore, createEvent } from "effector";

const savedDate = localStorage.getItem("savedDate") || "";
const savedBudget = localStorage.getItem("savedBudget") || "";

export const $date = createStore(savedDate);
export const $budget = createStore(savedBudget);

export const setDate = createEvent<string>();
export const setBudget = createEvent<string>();

$date.on(setDate, (_, newValue) => newValue);
$budget.on(setBudget, (_, newValue) => newValue);

$date.watch((newValue) => {
	localStorage.setItem("savedDate", newValue);
});
$budget.watch((newValue) => {
	localStorage.setItem("savedBudget", newValue);
});

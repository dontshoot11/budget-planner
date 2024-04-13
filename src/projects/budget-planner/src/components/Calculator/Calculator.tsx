import { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./style.module.css";

type TProps = {
	t: Record<string, string>;
};

export const Calculator = ({ t }: TProps) => {
	const [date, setDate] = useState(localStorage.getItem("savedDate") || "");
	const [budget, setBudget] = useState(
		localStorage.getItem("savedBudget") || ""
	);
	const [daysLeft, setDaysLeft] = useState("");
	const [budgetLeft, setBudgetLeft] = useState("");
	const [spend, setSpend] = useState("");
	const [showButton, setShowButton] = useState(false);

	const calculate = () => {
		const parsedEnterDate = Date.parse(date);
		const budgetValue = parseFloat(budget);
		const parsedToday = Date.now();
		const parsedDaysLeft = parsedEnterDate - parsedToday;
		const days = Math.ceil(parsedDaysLeft / 3600000 / 24);
		const left = Math.round((budgetValue / days) * 100) / 100;
		setDaysLeft(days.toString());
		setBudgetLeft(left.toString());
	};

	useEffect(() => {
		calculate();
	}, [date, budget]);

	const handleDateChange = (e) => {
		const newValue = e.target.value;
		setDate(newValue);
		localStorage.setItem("savedDate", newValue);
	};

	const handleBudgetChange = (e) => {
		const newValue = e.target.value;
		setBudget(newValue);
		localStorage.setItem("savedBudget", newValue);
	};

	const handleSpendChange = (e) => {
		if (e.target.value) {
			const spendValue = parseFloat(e.target.value);
			const newBudget = (parseFloat(budget) - spendValue).toString();
			setSpend("");
			setBudget(newBudget);
			localStorage.setItem("savedBudget", newBudget);
			setShowButton(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSpendChange(e);
			e.target.blur();
		}
	};

	return (
		<div className={styles.calculator}>
			<p className={styles.text}>{t.calc_desc_1}</p>
			<input
				className={styles.input}
				type="number"
				value={budget}
				onChange={handleBudgetChange}
			/>

			<p className={styles.text}>{t.calc_desc_2}</p>
			<input
				className={styles.input}
				type="date"
				value={date}
				onChange={handleDateChange}
			/>

			<p className={styles.text}>{t.calc_desc_3}</p>
			<div className={styles.left}>{daysLeft}</div>
			<p className={styles.text}>{t.calc_desc_4}</p>
			<div className={styles.left}>{budgetLeft}</div>
			<p className={styles.text}>{t.calc_desc_5}</p>
			<div className={styles.inputWrap}>
				<input
					className={styles.input}
					type="number"
					value={spend}
					onChange={(e) => setSpend(e.target.value)}
					onBlur={handleSpendChange}
					onKeyDown={handleKeyPress}
					onFocus={() => {
						setShowButton(true);
					}}
				/>
				<button className={cn(styles.inputButton, showButton && styles.active)}>
					OK
				</button>
			</div>
		</div>
	);
};

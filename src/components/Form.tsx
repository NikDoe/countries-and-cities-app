import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Form.module.css';
import Button from './Button';

function Form() {
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');

	const navigate = useNavigate();

	const handleAdd = (e: FormEvent) => {
		e.preventDefault();
		console.log('add');
	};

	const handleNavigateBack = (e: FormEvent) => {
		e.preventDefault();
		navigate(-1);
	};

	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input
					id='cityName'
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				{/* <span className={styles.flag}>{emoji}</span> */}
			</div>

			<div className={styles.row}>
				<label htmlFor='date'>When did you go to {cityName}?</label>
				<input
					id='date'
					onChange={(e) => setDate(e.target.value)}
					value={date}
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor='notes'>Notes about your trip to {cityName}</label>
				<textarea
					id='notes'
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button 
					customType='primary'
					onClick={handleAdd}
				>
					Add
				</Button>
				<Button 
					customType='back'
					onClick={handleNavigateBack}
				>
					&larr; Back
				</Button>
			</div>
		</form>
	);
}

export default Form;

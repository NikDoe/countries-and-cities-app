import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Form.module.css';
import Button from './Button';
import BackButton from './BackButton';

function Form() {
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');

	const handleAdd = (e: FormEvent) => {
		e.preventDefault();
		console.log('add');
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
				<BackButton />
			</div>
		</form>
	);
}

export default Form;

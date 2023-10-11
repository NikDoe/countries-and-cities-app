import { FormEvent, useEffect, useState } from 'react';
import { TCityData } from '../types';
import { convertToEmoji } from '../utils';
import { useUrlPosition } from '../hooks/useUrlPosition';

import Button from './Button';
import BackButton from './BackButton';
import Message from './Message';
import Spinner from './Spinner';

import styles from './Form.module.css';

const API_CITY_DATA_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [date, setDate] = useState(() => new Date());
	const [notes, setNotes] = useState('');
	const [emoji, setEmoji] = useState('');
	const [loadingForm, setLoadingForm] = useState<boolean>(false);
	const [geolocationError, setGeolocationError] = useState<null | string>(null);
	const [lat, lng] = useUrlPosition();

	const handleAdd = (e: FormEvent) => {
		e.preventDefault();
		console.log('add');
	};

	console.log(cityName);
	

	useEffect(function () {
		async function fetchCityData () {
			setGeolocationError(null);
			setLoadingForm(true);
			try {
				const response = await fetch(`${API_CITY_DATA_URL}?latitude=${lat}&longitude=${lng}`);
				const data: TCityData = await response.json();

				const { city, countryCode, countryName, locality } = data;

				if (!countryCode) {
					throw new Error(
						'That doesn\'t seem to be a city. Click somewhere else 😉'
					);
				}

				setCityName(city || locality || '');
				setCountry(countryName);
				setEmoji(convertToEmoji(countryCode));
			} catch (error) {
				if(error instanceof Error) {
					setGeolocationError(error.message);
				}
			} finally{
				setLoadingForm(false);
			}
		}

		fetchCityData();
	}, [lat, lng]);

	if(loadingForm) {
		return <Spinner />;
	}

	if(geolocationError) {
		return <Message message={geolocationError} />;
	}

	if(!cityName) return null;

	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input
					id='cityName'
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
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

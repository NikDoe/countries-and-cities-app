import { FormEvent, useEffect, useState } from 'react';
import { TCity, TCityData } from '../types';
import { convertToEmoji } from '../utils';
import { useUrlPosition } from '../hooks/useUrlPosition';
import { useCities } from '../contexts/CitiesContext';
import { useNavigate } from 'react-router-dom';

import DatePicker from 'react-datepicker';

import Button from './Button';
import BackButton from './BackButton';
import Message from './Message';
import Spinner from './Spinner';

import styles from './Form.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const API_CITY_DATA_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [date, setDate] = useState<Date | null>(new Date());
	const [notes, setNotes] = useState('');
	const [emoji, setEmoji] = useState('');
	const [loadingForm, setLoadingForm] = useState<boolean>(false);
	const [geolocationError, setGeolocationError] = useState<null | string>(null);
	const [lat, lng] = useUrlPosition();
	const { createCity, isLoading } = useCities();
	const navigate = useNavigate();

	async function handleAdd (e: FormEvent) {
		e.preventDefault();

		if(!cityName || !date) return;

		const originalDate  = new Date(date);
		const year = originalDate.getFullYear();
		const month = String(originalDate.getMonth() + 1).padStart(2, '0');
		const day = String(originalDate.getDate()).padStart(2, '0');
		const hours = String(originalDate.getHours()).padStart(2, '0');
		const minutes = String(originalDate.getMinutes()).padStart(2, '0');
		const seconds = String(originalDate.getSeconds()).padStart(2, '0');
		const milliseconds = originalDate.getMilliseconds();

		const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

		const newCity: TCity = {
			cityName,
			country,
			emoji,
			date: formattedDate,
			notes,
			position: { 
				lat: Number(lat), 
				lng: Number(lng) 
			},
			id: Date.now(),
		};

		await createCity(newCity);
		navigate('/app');
	}	

	useEffect(function () {
		if(!lat && !lng) return;

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

	if(loadingForm || isLoading) {
		return <Spinner />;
	}

	if(!lat && !lng) {
		return <Message message='Start clicking somewhere on the map' />;
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
				<DatePicker
					id='date'
					onChange={date => setDate(date)} 
					selected={date}
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

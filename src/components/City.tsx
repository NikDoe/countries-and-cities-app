import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { formatDate } from '../utils';

import Spinner from './Spinner';
import BackButton from './BackButton';

import styles from './City.module.css';

function City() {
	const { id } = useParams<{ id: string }>();
	const { 
		getCity, 
		currentCity, 
		isLoading,
	} = useCities();
	const [isDataLoaded, setIsDataLoaded] = useState(false);

	useEffect(() => {
		async function fetchCity() {
			try {
				await getCity(Number(id));
				setIsDataLoaded(true);
			} catch (error) {
				console.error('Error loading city:', error);
			}
		}
	
		if (!isDataLoaded) {
			fetchCity();
		}
	}, [id, isDataLoaded]);
  
	if (isLoading || !isDataLoaded) {
		return <Spinner />;
	}

	if(!currentCity) return null;

	const { emoji, cityName, date, notes } = currentCity;

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>{emoji}</span> {cityName}
				</h3>
			</div>

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target='_blank'
					rel='noreferrer'
				>
          Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>

			<div>
				<BackButton />
			</div>
		</div>
	);
}

export default City;

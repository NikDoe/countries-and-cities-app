import { TCity, TCountry } from '../types';
import { useCities } from '../contexts/CitiesContext';

import Spinner from './Spinner';
import styles from './CountryList.module.css';
import CountryItem from './CountryItem';
import Message from './Message';

function CountryList() {
	const { cities, isLoading } = useCities();

	if (isLoading) return <Spinner />;

	if (!cities.length)
		return (
			<Message 
				message='Add your first city by clicking on a city on the map' 
			/>
		);

	const countries = cities.reduce(
		(countryArray: TCountry[], city: TCity) => {
			if(!countryArray.map(c => c.country).includes(city.country)) {
				return [
					...countryArray, 
					{ country: city.country, emoji: city.emoji }
				];
			}
			else return countryArray;
		},
		[]
	);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country.country} />
			))}
		</ul>
	);
}

export default CountryList;

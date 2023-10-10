import { Link } from 'react-router-dom';
import { TCity } from '../types';

import styles from './CityItem.module.css';
import { formatDate } from '../utils';
import { useCities } from '../contexts/CitiesContext';

type CityItemProps = {
    city: TCity;
}

function CityItem({ city }: CityItemProps) {
	const { currentCity } = useCities();
	const { cityName, emoji, date, id, position } = city;

	function handleClick() {
		console.log('delete city');
	}

	const activeCityClassName = id === currentCity?.id 
		? styles['cityItem--active'] 
		: '';

	const classNameString = `${styles.cityItem} ${activeCityClassName}`;

	return (
		<li>
			<Link
				className={classNameString}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>({formatDate(date)})</time>
				<button className={styles.deleteBtn} onClick={handleClick}>
                    &times;
				</button>
			</Link>
		</li>
	);
}

export default CityItem;

import { TCountry } from '../types';
import styles from './CountryItem.module.css';

type CountryItemProps = {
	country: TCountry;
}

function CountryItem({ country }: CountryItemProps) {
	return (
		<li className={styles.countryItem}>
			<span>{country.emoji}</span>
			<span>{country.country}</span>
		</li>
	);
}

export default CountryItem;

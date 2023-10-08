import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import Button from './Button';

function Map() {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	const handleChangePosition = () => {
		const newParams = { lat: '42.3601', lng: '-71.0589' };
		setSearchParams(newParams);
	};

	const handleClickOnMap = () => {
		navigate('form');
	};

	return (
		<div className={styles.mapContainer}
			onClick={handleClickOnMap}
		>
			<h1>Map</h1>
			<h2>
				Position : {lat}/{lng}
			</h2>
			<Button
				onClick={handleChangePosition}
			>
				change position
			</Button>
		</div>
	);
}

export default Map;

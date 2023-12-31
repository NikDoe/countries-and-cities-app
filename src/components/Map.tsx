import { useEffect, useState } from 'react';
import { LatLngTuple } from 'leaflet';
import { useGeolocation } from '../hooks/useGeolocation';

import MapContent from './MapContent';
import Button from './Button';

import styles from './Map.module.css';
import { useUrlPosition } from '../hooks/useUrlPosition';

const CENTER_MAP_POSITION: LatLngTuple  = [51.505, -0.09];

function Map() {
	const [mapPosition, setMapPosition] = useState<LatLngTuple | null>(null);
	const { coordinates, getCurrentPostion } = useGeolocation();
	const [mapLat, mapLng] = useUrlPosition();

	useEffect(function() {
		if(mapLat && mapLng) {
			setMapPosition([Number(mapLat), Number(mapLng)]);
		}
	}, [mapLat, mapLng]);

	useEffect(() => {
		if(coordinates) {
			setMapPosition([coordinates.latitude, coordinates.longitude]);
		}
	}, [coordinates]);

	const buttonContent = (
		<Button
			customType='position'
			onClick={getCurrentPostion}
		>
			your position
		</Button>
	);

	return (
		<div className={styles.mapContainer}>
			{/* {errorMessage && <Message message={errorMessage} />} */}
			{buttonContent}
			{/* {!errorMessage && <MapContent center={mapPosition || CENTER_MAP_POSITION} />} */}
			<MapContent center={mapPosition || CENTER_MAP_POSITION} />
		</div>
	);
}

export default Map;

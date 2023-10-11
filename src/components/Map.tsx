import { useEffect, useState } from 'react';
import { LatLngTuple } from 'leaflet';

import Message from './Message';
import MapContent from './MapContent';

import styles from './Map.module.css';
import { useSearchParams } from 'react-router-dom';


const CENTER_MAP_POSITION: LatLngTuple  = [51.505, -0.09];

function Map() {
	const [mapPosition, setMapPosition] = useState<LatLngTuple | null>(null);
	const [loading, setLoading] = useState(true);

	const [searchParams] = useSearchParams();
	const mapLat = searchParams.get('lat');
	const mapLng = searchParams.get('lng');

	useEffect(() => {
		async function fetchData () {
			try {
				if ('geolocation' in navigator) {
					const position = await new Promise<GeolocationPosition>((resolve, reject) => {
						navigator.geolocation.getCurrentPosition(
							(position) => {
								resolve(position);
							},
							(error) => {
								reject(error);
							}
						);
					});
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					const latLng: LatLngTuple = [latitude, longitude];
					setMapPosition(latLng);
				} else {
					throw new Error('Геолокация не поддерживается в этом браузере.');
				}
			} catch (error) {
				if(error instanceof Error) {
					console.error(`Ошибка геолокации: ${error.message}`);
				}
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	useEffect(function() {
		if(mapLat && mapLng) {
			setMapPosition([Number(mapLat), Number(mapLng)]);
		}
	}, [mapLat, mapLng]);

	const mapLoading = <Message message='Получение координат...' />;

	return (
		<div className={styles.mapContainer}>
			{loading && mapLoading}
			{!loading && <MapContent center={mapPosition || CENTER_MAP_POSITION} />}
		</div>
	);
}

export default Map;

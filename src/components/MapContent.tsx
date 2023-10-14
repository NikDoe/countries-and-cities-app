import { TileLayer, MapContainer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

import styles from './Map.module.css';
import ChangeCenter from './ChangeCenter';
import MarkerList from './MarkerList';
import DetectMapClick from './DetectMapClick';

type MapContentProps = {
    center: LatLngExpression;
}

function MapContent({ center }: MapContentProps) {
	return (
		<MapContainer 
			className={styles.map} 
			center={center} 
			zoom={13} 
			scrollWheelZoom={true}
		>
			<ChangeCenter position={center} />
			<DetectMapClick />
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<MarkerList />
		</MapContainer>
	);
}

export default MapContent;

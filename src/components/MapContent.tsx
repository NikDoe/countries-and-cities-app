import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

import styles from './Map.module.css';

type MapContentProps = {
    center: LatLngExpression;
}

function MapContent({ center }: MapContentProps) {
	return (
		<MapContainer className={styles.map} center={center} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Marker position={center}>
				<Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
			</Marker>
		</MapContainer>
	);
}

export default MapContent;

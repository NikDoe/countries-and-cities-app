import { LatLngExpression } from 'leaflet';
import { ReactNode } from 'react';
import { Marker, Popup } from 'react-leaflet';

type MarkerItemProps = {
    children: ReactNode;
    center: LatLngExpression;
}

function MarkerItem(props: MarkerItemProps) {
	const {
		children,
		center
	} = props;
    
	return (
		<Marker position={center}>
			<Popup>{children}</Popup>
		</Marker>
	);
}

export default MarkerItem;

import { LatLngExpression } from 'leaflet';
import { useMap } from 'react-leaflet';

type ChangeCenterProps = {
    position: LatLngExpression;
    zoom?: number;
}

function ChangeCenter(props: ChangeCenterProps) {
	const {
		position,
		zoom = 6
	} = props;
    
	const map = useMap();
	map.setView(position, zoom);
	return null;
}

export default ChangeCenter;

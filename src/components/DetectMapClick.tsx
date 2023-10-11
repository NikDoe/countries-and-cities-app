import { useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

function DetectMapClick() {
	const navigate = useNavigate();
    
	useMapEvents({
		click: event => {
			const { latlng } = event;
			navigate(`form?lat=${latlng.lat}&lng=${latlng.lng}`);
		}
	});
	return null;
}

export default DetectMapClick;

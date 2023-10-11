import { useCities } from '../contexts/CitiesContext';
import MarkerItem from './MarkerItem';

function MarkerList() {
	const { cities } = useCities();
    
	return (
		<>
			{
				cities.map(city => {
					const { id, cityName, position } = city;
					const { lat, lng } = position;

					return (
						<MarkerItem
							key={id}
							center={[lat, lng]}
						>
							{cityName}
						</MarkerItem>
					);
				})
			}
		</>
	);
}

export default MarkerList;

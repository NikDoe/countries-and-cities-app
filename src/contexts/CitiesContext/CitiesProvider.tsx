import { ReactNode, useEffect, useState } from 'react';
import { CitiesContext } from './CitiesContext';
import { TContextValue } from '../../types';

type CitiesProviderProps = {
    children: ReactNode;
}

const API_URL = 'http://localhost:9000';

export function CitiesProvider({ children }: CitiesProviderProps) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(function(){
		async function fetchCities() {
			try {
				setIsLoading(true);
				const response = await fetch(`${API_URL}/cities`);
				const data = await response.json();

				setCities(data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchCities();
	}, []);

	const contextValue: TContextValue = {
		cities,
		isLoading
	};
    
	return (
		<CitiesContext.Provider
			value={contextValue}
		>
			{children}
		</CitiesContext.Provider>
	);
}

export default CitiesProvider;

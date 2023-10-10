import { ReactNode, useEffect, useState } from 'react';
import { CitiesContext } from './CitiesContext';
import { TCity, TContextValue } from '../../types';

type CitiesProviderProps = {
    children: ReactNode;
}

const API_URL = 'http://localhost:9000';

export function CitiesProvider({ children }: CitiesProviderProps) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentCity, setCurrentCity] = useState<TCity | null>(null);

	useEffect(function(){
		async function fetchCities(): Promise<void> {
			setIsLoading(true);

			try {
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

	async function getCity(cityId: number): Promise<void> {
		setIsLoading(true);

		try {
			const response = await fetch(`${API_URL}/cities/${cityId}`);
			const data = await response.json();

			setCurrentCity(data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	const contextValue: TContextValue = {
		cities,
		isLoading,
		currentCity,
		getCity,
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

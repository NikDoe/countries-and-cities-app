import { ReactNode, useEffect, useReducer } from 'react';
import { CitiesContext } from './CitiesContext';
import { 
	ActionType, 
	TAction, 
	TCitiesState, 
	TCity, 
	TContextValue 
} from '../../types';

type CitiesProviderProps = {
    children: ReactNode;
}

const API_URL = 'http://localhost:9000';

const initialState: TCitiesState = {
	cities: [],
	isLoading: false,
	currentCity: null,
	error: ''
};

function reducer (state: TCitiesState, action: TAction): TCitiesState {
	switch (action.type) {
		case ActionType.LOADING:
			return {
				...state,
				isLoading: true,
			};
		case ActionType.FETCH_CITIES:
			return {
				...state,
				isLoading: false,
				cities: action.payload
			};
		case ActionType.GET_CITY:
			return {
				...state,
				isLoading: false,
				currentCity: action.payload
			};
		case ActionType.CREATE_CITY:
			return {
				...state,
				isLoading: false,
				currentCity: action.payload,
				cities: [...state.cities, action.payload]
			};
		case ActionType.DELETE_CITY:
			return {
				...state,
				isLoading: false,
				currentCity: null,
				cities: state.cities.filter(
					city => city.id !== action.payload
				)
			};
		case ActionType.REJECTED:
			return {
				...state,
				isLoading: false,
				error: action.payload
			};
		default:
			return state;
	}
}

export function CitiesProvider({ children }: CitiesProviderProps) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { cities, currentCity, isLoading, error } = state;

	useEffect(function(){
		async function fetchCities(): Promise<void> {
			dispatch({ type: ActionType.LOADING });

			try {
				const response = await fetch(`${API_URL}/cities`);
				const data = await response.json();

				dispatch({ type: ActionType.FETCH_CITIES, payload: data });
			} catch (error) {
				dispatch({ 
					type: ActionType.REJECTED, 
					payload: 'There was an error loading ALL cities💀' 
				});
			}
		}

		fetchCities();
	}, []);

	async function getCity(cityId: number): Promise<void> {
		dispatch({ type: ActionType.LOADING });

		try {
			const response = await fetch(`${API_URL}/cities/${cityId}`);
			const data = await response.json();

			dispatch({ type: ActionType.GET_CITY, payload: data });
		} catch (error) {
			dispatch({ 
				type: ActionType.REJECTED, 
				payload: 'There was an error loading city💀'
			});
		}
	}

	async function createCity(newCity:TCity): Promise<void> {
		dispatch({ type: ActionType.LOADING });

		try {
			const response =  await fetch(
				`${API_URL}/cities`, 
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newCity),
				}
			);
			const data = await response.json();

			dispatch({ type: ActionType.CREATE_CITY, payload: data });
		} catch (error) {
			dispatch({ 
				type: ActionType.REJECTED, 
				payload: 'There was an error creating city💀'
			});
		}
	}

	async function deleteCity (id: number) {
		dispatch({ type: ActionType.LOADING });

		try {
			await fetch(`${API_URL}/cities/${id}`, {
				method: 'DELETE'
			});
			
			dispatch({ type: ActionType.DELETE_CITY, payload: id });
		} catch (error) {
			dispatch({ 
				type: ActionType.REJECTED, 
				payload: 'There was an error deleting city💀'
			});
		}
	}

	const contextValue: TContextValue = {
		cities,
		isLoading,
		currentCity,
		error,
		getCity,
		createCity,
		deleteCity,
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

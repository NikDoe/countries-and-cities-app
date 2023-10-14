import { createContext } from 'react';
import { TContextValue } from '../../types';

const defaultContextValue: TContextValue  = {
	cities: [],
	isLoading: false,
	currentCity: null,
	error: '',
	getCity: async () => {},
	createCity: async () => {},
	deleteCity: async () => {},
};

export const CitiesContext = createContext(defaultContextValue);
import { createContext } from 'react';
import { TContextValue } from '../../types';

const defaultContextValue: TContextValue  = {
	cities: [],
	isLoading: false,
	currentCity: null,
	getCity: async () => {},
	createCity: async () => {},
};

export const CitiesContext = createContext(defaultContextValue);
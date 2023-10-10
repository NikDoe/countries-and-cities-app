import { createContext } from 'react';
import { TContextValue } from '../../types';

const defaultContextValue: TContextValue  = {
	cities: [],
	isLoading: false,
};

export const CitiesContext = createContext(defaultContextValue);
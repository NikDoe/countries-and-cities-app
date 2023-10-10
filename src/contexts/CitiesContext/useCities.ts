import { useContext } from 'react';
import { CitiesContext } from './CitiesContext';
import { TContextValue } from '../../types';

export function useCities (): TContextValue {
	const context = useContext(CitiesContext);

	if(context === undefined)
		throw new Error('use CitiesContext outside the provider');

	return context;
}
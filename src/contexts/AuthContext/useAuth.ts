import { useContext } from 'react';
import { TAuthContextValue } from '../../types';
import { AuthContext } from './AuthContext';

export function useAuth (): TAuthContextValue {
	const context = useContext(AuthContext);

	if(context === undefined)
		throw new Error('use CitiesContext outside the provider');

	return context;
}
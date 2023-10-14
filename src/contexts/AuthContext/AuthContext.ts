import { createContext } from 'react';
import { TAuthContextValue, TAuthState } from '../../types';

export const authInitialState: TAuthState = {
	isAuthenticated: false,
	user: null,
};

const defaultContextValue: TAuthContextValue  = {
	...authInitialState,
	login: () => {},
	logout: () => {}
};

export const AuthContext = createContext(defaultContextValue);
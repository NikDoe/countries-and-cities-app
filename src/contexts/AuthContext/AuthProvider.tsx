import { ReactNode, useReducer } from 'react';
import { AuthContext, authInitialState } from './AuthContext';
import { 
	AuthActionType, 
	TAuthAction, 
	TAuthContextValue, 
	TAuthState 
} from '../../types';

type AuthProviderProps = {
    children: ReactNode;
}

const FAKE_USER = {
	name: 'Jack',
	email: 'jack@example.com',
	password: 'qwerty',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};

function reducer (state: TAuthState, action: TAuthAction): TAuthState {
	switch (action.type) {
		case AuthActionType.LOGIN:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			};
		case AuthActionType.LOGOUT:
			return {
				...state,
				user: null,
				isAuthenticated: false,
			};
		default:
			return state;
	}
}

export function AuthProvider ({ children }: AuthProviderProps) {
	const [state, dispatch] = useReducer(reducer, authInitialState);
	const { user, isAuthenticated } = state;

	function login (email: string, password: string) {
		if(email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: AuthActionType.LOGIN, payload: FAKE_USER });
		}
	}

	function logout () {
		dispatch({ type: AuthActionType.LOGOUT });
	}

	const authContextValue: TAuthContextValue = {
		user,
		isAuthenticated,
		login,
		logout
	};

	return (
		<AuthContext.Provider
			value={authContextValue}
		>
			{children}
		</AuthContext.Provider>
	);
}
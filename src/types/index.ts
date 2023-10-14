export type Tposition = {
	lat: number;
	lng: number;
}

export type TCity = {
	cityName: string;
	country: string;
	emoji: string;
	date: string;
	notes: string;
	position: Tposition;
	id: number;
}

export type TCountry = {
	country: string;
	emoji: string;
}

export type TCitiesState = {
	cities: TCity[];
	isLoading: boolean;
	currentCity: TCity | null;
	error: string;
}

export enum ActionType {
    LOADING = 'loading',
	FETCH_CITIES = 'cities/loaded',
	GET_CITY = 'city/loaded',
	CREATE_CITY = 'city/created',
	DELETE_CITY = 'city/deleted',
	REJECTED = 'rejected',
}

export type TAction = 
{ type: ActionType.LOADING; } |
{ type: ActionType.FETCH_CITIES; payload: TCity[] } | 
{ type: ActionType.GET_CITY; payload: TCity } | 
{ type: ActionType.CREATE_CITY; payload: TCity } |
{ type: ActionType.DELETE_CITY; payload: number } |
{ type: ActionType.REJECTED; payload: string }

export interface TContextValue extends TCitiesState {
	getCity: (id: number) => Promise<void>;
	createCity: (newCity: TCity) => Promise<void>;
	deleteCity: (id: number) => Promise<void>;
}

export type TCityData = {
	city: string;
	countryCode: string;
	countryName: string;
	locality: string;
}

export type TUser = {
	name: string;
	avatar: string;
	email: string;
	password: string;
}

export type TAuthState = {
	user: TUser | null;
	isAuthenticated: boolean;
}

export enum AuthActionType  {
	LOGIN = 'login',
	LOGOUT = 'logout'
}

export type TAuthAction = 
{ type: AuthActionType.LOGIN; payload: TUser } |
{ type: AuthActionType.LOGOUT; }

export interface TAuthContextValue extends TAuthState {
	login: (email: string, password: string) => void;
	logout: () => void;
}
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

export type TContextValue = {
	cities: TCity[];
	isLoading: boolean;
	currentCity: TCity | null;
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
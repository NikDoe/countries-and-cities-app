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
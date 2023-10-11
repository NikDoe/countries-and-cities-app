import { useState, useEffect } from 'react';

type TCoordinates = {
  latitude: number;
  longitude: number;
};

export const useGeolocation = function () {
	const [coordinates, setCoordinates] = useState<null | TCoordinates>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<null | string>(null);

	const errorMessages: Record<number, string> = {
		1: 'Вы запретили доступ к геолокации',
		2: 'Информация о местоположении недоступна',
		3: 'Время ожидания запроса геолокации истекло',
	};

	const getCurrentPostion = function () {
		if (!navigator.geolocation) {
			setErrorMessage('Геолокация не поддерживается в вашем браузере');
			return;
		}

		setIsLoading(true);

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setErrorMessage(null);
				setCoordinates({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
				setIsLoading(false);
			},
			(error) => {
				setErrorMessage(errorMessages[error.code] || 'Произошла неизвестная ошибка');
				setIsLoading(false);
			}
		);
	};

	useEffect(() => {
		getCurrentPostion();
	}, []);

	return { coordinates, isLoading, errorMessage, getCurrentPostion };
};

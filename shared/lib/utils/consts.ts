import { v4 as uuidv4 } from 'uuid';
import {  iPos, iStructureItem, iWeatherCodeDone, iWindspeedDone, tWeatherCodes } from '../types';

export enum eLocalStorageKeys{
    LOCATIONS = 'positions',
    STRUCTURE = 'structure',
}

export enum eTilesSize{
	SM = 'small',
	MD = 'medium',
	LG = 'large',
}

export enum eRoutes{
    ADD_LOCATION = 'add-location',
    ALL_LOCATIONS = 'all-cities'
}

export const DEFAULT_POSITIONS: iPos[] = [
	{
		lat: 51.507351,
		long: -0.127758
	},
	{
		lat: 48.856613,
		long: 2.352222
	},
	{
		lat: 50.450100,
		long: 30.523399
	},
	{
		lat: 40.713051,
		long: -74.007233
	},
	{
		lat: -33.868820,
		long: 151.209290
	},
];

export const WEATHER_CODES = (code: tWeatherCodes, hour?: number): iWeatherCodeDone => {

	const isNight: boolean = hour !== undefined ? hour > 20 || hour < 6 : false;

	switch (code) {
	case 0:
		return {
			img: isNight ? '0_night' : '0',
			text: 'Clear sky'
		};

	case 1:
	case 2:
		return {
			img: isNight ? '2_night' : '2',
			text: 'Partly cloudy'
		};

	case 3:
		return {
			img: '3',
			text: 'Overcast sky'
		};

	case 45:
	case 48:
		return {
			img: '45',
			text: 'Fog'
		};

	case 51:
	case 53:
	case 61:
	case 63:
	case 80:
	case 81:
		return {
			img: '51',
			text: 'Slight or moderate rain'
		};

	case 55:
	case 65:
	case 82:
		return {
			img: '55',
			text: 'Heavy rain'
		};

	case 56:
	case 57:
	case 66:
	case 67:
		return {
			img: '56',
			text: 'Freezing Drizzle'
		};

	case 71:
	case 73:
	case 77:
	case 85:
		return {
			img: '71',
			text: 'Slight or moderate snowfall'
		};

	case 75:
	case 86:
		return {
			img: '75',
			text: 'Heavy snowfall'
		};

	case 95:
		return {
			img: '95',
			text: 'Slight or moderate thunderstorm'
		};

	case 96:
	case 99:
		return {
			img: '96',
			text: 'Thunderstorm with slight and heavy hail'
		};

	}
};

export const WINDSPEED = (value: number): iWindspeedDone => {
	if (value === 0) {
		return {
			title: 'Calm',
			text: 'Smoke rises vertically'
		};
	}
	else if (value >= 0 && value <= 20) {
		return {
			title: 'Light winds',
			text: 'Wind felt on face; leaves rustle; ordinary vanes moved by wind.'
		};
	}
	else if (value > 20 && value <= 30) {
		return {
			title: 'Moderate winds',
			text: 'Raises dust and loose paper; small branches are moved.'
		};
	}
	else if (value > 30 && value <= 40) {
		return {
			title: 'Fresh winds',
			text: 'Small trees in leaf begin to sway; crested wavelets form on inland waters'
		};
	}
	else if (value > 40 && value <= 50) {
		return {
			title: 'Strong winds',
			text: 'Large branches in motion; whistling heard in telephone wires; umbrellas used with difficulty.'
		};
	}
	return {
		title: 'Storm',
		text: 'Seldom experienced inland; trees uprooted; considerable structural damage.'
	};
};

export const structureDefault = (): Array<iStructureItem> => {
	return [
		{
			id: uuidv4(),
			name: 'MainInfoTile',
			displayName: 'Current weather information',
			size: 'medium'
		},
		{
			id: uuidv4(),
			name: 'HourlyWeatherTile',
			displayName: 'Hourly weather information',
			size: 'medium'
		},
		{
			id: uuidv4(),
			name: 'DailyWeatherTile',
			displayName: 'Daily weather information',
			size: 'large'
		},
	];
};

export const availableBlocksDefault = (): Array<iStructureItem> => {
	return [
		{
			id: uuidv4(),
			name: 'SunriseTile',
			displayName: 'Sunrise Sunset Information',
			size: 'small'
		},
		{
			id: uuidv4(),
			name: 'WindTile',
			displayName: 'Wind information',
			size: 'small'
		}
	];
};

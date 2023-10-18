import axios from 'axios';

const geocoding = axios.create({
	baseURL: import.meta.env.VITE_BASE_GEOCODING,
});
const geocodingReversed = axios.create({
	baseURL: import.meta.env.VITE_BASE_GEOCODING_REVERSED,
});
const weather = axios.create({
	baseURL: import.meta.env.VITE_BASE_WEATHER,
});

export const $api = {
	geocoding,
	geocodingReversed,
	weather
};


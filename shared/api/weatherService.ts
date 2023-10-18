import { AxiosResponse } from 'axios';
import { iPos } from '../lib/types';
import { iDailyWeatherDone, iDailyWeatherRaw, iHourlyWeatherDone, iHourlyWeatherRaw, iMainWeatherDone, iMainWeatherRaw, iSunWeatherDone, iSunWeatherRaw, iWindWeatherDone, iWindWeatherRaw } from '../lib/types/weather';
import { getTimezone } from '../lib/utils';
import { $api } from './apiClient';


export async function getMainInfo(pos: iPos, timezone?: string | null): Promise<iMainWeatherDone> {

	return $api.weather<iMainWeatherRaw>(`?latitude=${pos.lat}&longitude=${pos.long}&current_weather=true&hourly=precipitation_probability,apparent_temperature,rain,snowfall&daily=temperature_2m_max,temperature_2m_min&timezone=${timezone ? timezone : getTimezone()}`)
		.then(res => mainInfoFormatter(res.data));
}
export async function getMainInfoPending(pos: iPos, timezone?: string | null): Promise<AxiosResponse<iMainWeatherRaw, any>> {

	return $api.weather<iMainWeatherRaw>(`?latitude=${pos.lat}&longitude=${pos.long}&current_weather=true&hourly=precipitation_probability,apparent_temperature,rain,snowfall&daily=temperature_2m_max,temperature_2m_min&timezone=${timezone ? timezone : getTimezone()}`);
}

export async function getHourlyInfo(pos: iPos, timezone?: string | null): Promise<iHourlyWeatherDone[]> {

	return $api.weather<iHourlyWeatherRaw>(`?latitude=${pos.lat}&longitude=${pos.long}&hourly=precipitation_probability,temperature_2m,rain,snowfall,weathercode&timezone=${timezone ? timezone : getTimezone()}`)
		.then(res => hourlyInfoFormatter(res.data));
}
export async function getDailyInfo(pos: iPos, timezone?: string | null): Promise<iDailyWeatherDone[]> {

	return $api.weather<iDailyWeatherRaw>(`?latitude=${pos.lat}&longitude=${pos.long}&daily=precipitation_probability_max,weathercode,temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum&timezone=${timezone ? timezone : getTimezone()}`)
		.then(res => dailyInfoFormatter(res.data));
}
export async function getSunriseSunset(pos: iPos, timezone?: string | null): Promise<iSunWeatherDone> {

	return $api.weather<iSunWeatherRaw>(`?latitude=${pos.lat}&longitude=${pos.long}&daily=sunrise,sunset&timezone=${timezone ? timezone : getTimezone()}`)
		.then(res => sunriseSunsetFormatter(res.data));
}
export async function getWind(pos: iPos): Promise<iWindWeatherDone> {

	return $api.weather<iWindWeatherRaw>(`?latitude=${pos.lat}&longitude=${pos.long}&current_weather=true`)
		.then(res => ({
			winddirection: res.data.current_weather.winddirection,
			windspeed: res.data.current_weather.windspeed
		}));
}

export function mainInfoFormatter(data: iMainWeatherRaw): iMainWeatherDone {
	const timeRounded = data.current_weather.time.slice(-2) !== '00' ? data.current_weather.time.slice(0, -2) + '00' : data.current_weather.time;
	const currentIndex = data.hourly.time.findIndex(i => i === timeRounded);
	
	return {
		status: data.current_weather.weathercode,
		time: new Date(data.current_weather.time).getHours(),
		temperature: data.current_weather.temperature,
		maxToday: data.daily.temperature_2m_max[0],
		minToday: data.daily.temperature_2m_min[0],
		windspeed: data.current_weather.windspeed,
		rain: data.hourly.rain[currentIndex],
		snow: data.hourly.snowfall[currentIndex],
		precipitationProbability: Math.ceil(data.hourly.precipitation_probability[currentIndex]),
		feelsLikeTemperature: data.hourly.apparent_temperature[currentIndex],
	};
}

function hourlyInfoFormatter(data: iHourlyWeatherRaw): iHourlyWeatherDone[] {

	const result: iHourlyWeatherDone[] = [];

	data.hourly.time.forEach((el, index) => {
		const timeNow = new Date(new Date().toLocaleString('en-US', { timeZone: data.timezone }));
		const timeCurr = new Date(el);
		const oneDay = new Date(timeNow).getTime() + (1 * 24 * 60 * 60 * 1000);

		if ((timeNow.getTime() <= (timeCurr.getTime() + 1000 * 60 * 60)) && timeCurr.getTime() < oneDay) {
			result.push({
				status: data.hourly.weathercode[index],
				time: timeCurr.getHours(),
				temperature: data.hourly.temperature_2m[index],
				rain: data.hourly.rain[index],
				precipitationProbability: Math.ceil(data.hourly.precipitation_probability[index]),
				snow: data.hourly.snowfall[index],
			});
		}

	});

	return result;

}

function dailyInfoFormatter(data: iDailyWeatherRaw): iDailyWeatherDone[] {

	const result: iDailyWeatherDone[] = [];

	data.daily.time.forEach((el, index) => {
		result.push({
			status: data.daily.weathercode[index],
			date: el,
			temperatureMin: data.daily.temperature_2m_min[index],
			temperatureMax: data.daily.temperature_2m_max[index],
			rain: data.daily.rain_sum[index],
			precipitationProbability: Math.ceil(data.daily.precipitation_probability_max[index]),
			snow: data.daily.snowfall_sum[index],
		});
	});
	return result;
}

function sunriseSunsetFormatter(data: iSunWeatherRaw): iSunWeatherDone {
	return {
		sunrise: data.daily.sunrise[0],
		sunset: data.daily.sunset[0],
		timeNow: new Date().toLocaleString('en-US', { timeZone: data.timezone })
	};

}

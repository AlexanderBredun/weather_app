import { tWeatherCodes } from '../index';
import { CurrentWeatherUnits, CurrentWeather,
	HourlyWeatherCurrent,
	WeatherBase, 
	ConvertToUnit, 
	DailyWeatherCurrent } from './weather';

export interface iMainWeatherRaw extends WeatherBase {
  current_weather_units: CurrentWeatherUnits;
  current_weather: CurrentWeather;
  hourly_units: ConvertToUnit<HourlyWeatherCurrent>;
  hourly: HourlyWeatherCurrent;
  daily_units: ConvertToUnit<DailyWeatherCurrent>;
  daily: DailyWeatherCurrent;
}

export interface iMainWeatherDone{
  status: tWeatherCodes,
  time: number,
  temperature: number,
  maxToday: number,
  minToday: number,
  windspeed: number,
  rain: number,
  snow: number,
  precipitationProbability: number,
  feelsLikeTemperature: number,
}

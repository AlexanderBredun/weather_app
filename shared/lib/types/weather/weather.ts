import { tWeatherCodes } from '../index';

export interface WeatherBase {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
}

export type ConvertToUnit<T> = {
    [K in keyof T]: string;
};

export interface CurrentWeather {
    time: string;
    interval: number;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: number;
    weathercode: tWeatherCodes;
}
export interface CurrentWeatherUnits {
    time: string;
    interval: string;
    temperature: string;
    windspeed: string;
    winddirection: string;
    is_day: string;
    weathercode: tWeatherCodes;
}
export interface DailyWeatherBase {
    time: string[];
}
export interface DailyWeatherCurrent extends DailyWeatherBase{
    temperature_2m_max: number[];
    temperature_2m_min: number[];
}
export interface DailyWeatherDaily extends DailyWeatherBase{
    precipitation_probability_max: number[]
    weathercode: tWeatherCodes[]
    rain_sum: number[]
    snowfall_sum: number[]
    temperature_2m_max: number[];
    temperature_2m_min: number[];
}

export interface HourlyWeatherBase {
    time: string[];
    precipitation_probability: number[];
    rain: number[];
    snowfall: number[];
}
export interface HourlyWeatherCurrent extends HourlyWeatherBase {
    apparent_temperature: number[];
}
export interface HourlyWeatherHourly extends HourlyWeatherBase {
    temperature_2m: number[];
    weathercode: tWeatherCodes[];
}

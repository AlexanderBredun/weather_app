import { tWeatherCodes } from '../index';
import { ConvertToUnit, HourlyWeatherHourly, WeatherBase } from './weather';


export interface iHourlyWeatherRaw extends WeatherBase {
    hourly_units: ConvertToUnit<HourlyWeatherHourly>;
    hourly: HourlyWeatherHourly;
}
export interface iHourlyWeatherDone {
    status: tWeatherCodes,
    time: number,
    temperature: number,
    rain: number,
    precipitationProbability: number,
    snow: number,
}
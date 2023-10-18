import { tWeatherCodes } from '../index';
import { ConvertToUnit, DailyWeatherDaily, WeatherBase } from './weather';

export interface iDailyWeatherRaw extends WeatherBase {
    daily_units: ConvertToUnit<DailyWeatherDaily>
    daily: DailyWeatherDaily
}
export interface iDailyWeatherDone {
    status: tWeatherCodes,
    date: string,
    temperatureMin: number,
    temperatureMax: number,
    rain: number,
    precipitationProbability: number,
    snow: number,
}
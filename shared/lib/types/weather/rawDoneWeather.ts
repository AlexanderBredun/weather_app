import { ConvertToUnit, CurrentWeather, CurrentWeatherUnits, DailyWeatherBase, WeatherBase } from './weather';

interface SunDaily extends DailyWeatherBase{
    sunrise: string[]
    sunset: string[]
}

export interface iSunWeatherRaw extends WeatherBase {
    daily: SunDaily
    daily_units: ConvertToUnit<SunDaily>
}

export interface iSunWeatherDone {
    sunrise: string,
    sunset: string,
    timeNow: string
}

export interface iWindWeatherRaw extends WeatherBase {
    current_weather_units: CurrentWeatherUnits
    current_weather: CurrentWeather
}

export interface iWindWeatherDone {
    winddirection: number
    windspeed: number
}
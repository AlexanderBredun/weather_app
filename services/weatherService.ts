import { IMainWeather } from '@/types/IMainInfo'
import { IHourlyInfo } from '@/types/IHourlyInfo'
import { IDailyInfo } from '@/types/IDailyInfo'
import { ISunsetInfo } from '@/types/ISunsetInfo'
import { 
    IMainInfoTransformed,
    IHourlyInfoTransformed,
    IDailyInfoTransformed,
    ISunsetTransformed
 } from '@/types/transormedData'

interface Pos{
    lat: number;
    long: number
}



class WeatherService {
    #base: string = 'https://api.open-meteo1.com/v1/forecast'
    #timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone

    getMainInfo(pos:Pos, timezone: string | null):string {
       
        return `?latitude=${pos.lat}&longitude=${pos.long}&current_weather=true&hourly=precipitation_probability,apparent_temperature,rain,snowfall&daily=temperature_2m_max,temperature_2m_min&timezone=${timezone ? timezone : this.#timezone}`
    }

    getHourlyInfo(pos:Pos, timezone: string | null):string {
        return `?latitude=${pos.lat}&longitude=${pos.long}&hourly=precipitation_probability,temperature_2m,rain,snowfall,weathercode&timezone=${timezone ? timezone : this.#timezone}`
    }

    getDailyInfo(pos:Pos, timezone: string | null):string {
        return `?latitude=${pos.lat}&longitude=${pos.long}&daily=precipitation_probability_max,weathercode,temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum&timezone=${timezone ? timezone : this.#timezone}`
    }

    getSunriseSunset(pos:Pos, timezone: string | null):string {
        return `?latitude=${pos.lat}&longitude=${pos.long}&daily=sunrise,sunset&timezone=${timezone ? timezone : this.#timezone}`
    }

    getWind(pos:Pos, timezone: string | null):string {
        return `?latitude=${pos.lat}&longitude=${pos.long}&current_weather=true`
    }
    
    mainInfoFormatter(data: IMainWeather):IMainInfoTransformed {
       
        const currentIndex = data.hourly.time.findIndex(i => i === data.current_weather.time);
        
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
           
        }
    }

    hourlyInfoFormatter(data: IHourlyInfo){
      
        const result:Array<IHourlyInfoTransformed> = []
       
        data.hourly.time.forEach((el, index) => {
            const timeNow = new Date(new Date().toLocaleString('en-US', { timeZone: data.timezone }));
            const timeCurr = new Date(el);
            const oneDay = new Date(timeNow).getTime() + (1 * 24 * 60 * 60 * 1000)

           if((timeNow.getTime() <= (timeCurr.getTime() + 1000 * 60 * 60)) && timeCurr.getTime() < oneDay){
            result.push({
                status: data.hourly.weathercode[index],
                time: timeCurr.getHours(),
                temperature: data.hourly.temperature_2m[index],
                rain: data.hourly.rain[index],
                precipitationProbability: Math.ceil(data.hourly.precipitation_probability[index]),
                snow: data.hourly.snowfall[index],
            })
           }
            
        })
        
        return result;

    }

    dailyInfoFormatter(data: IDailyInfo){
      
        const result:Array<IDailyInfoTransformed> = []
        
        data.daily.time.forEach((el, index) => {
            result.push({
                status: data.daily.weathercode[index],
                date: el,
                temperatureMin: data.daily.temperature_2m_min[index],
                temperatureMax: data.daily.temperature_2m_max[index],
                rain: data.daily.rain_sum[index],
                precipitationProbability: Math.ceil(data.daily.precipitation_probability_max[index]),
                snow: data.daily.snowfall_sum[index],
            })
            
        })
        
        return result;

    }
    sunriseSunsetFormatter(data: ISunsetInfo): ISunsetTransformed{
        return {
            sunrise: data.daily.sunrise[0],
            sunset: data.daily.sunset[0],
            timeNow:  new Date().toLocaleString('en-US', { timeZone: data.timezone })
        };

    }
}


export default new WeatherService()

export type { WeatherService as WeatherServiceType }
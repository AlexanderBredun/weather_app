export interface IMainInfoTransformed {
  status: number
  time: number
  temperature: number
  maxToday: number
  minToday: number
  windspeed: number
  rain: number
  snow: number
  feelsLikeTemperature: number
  precipitationProbability: number
}

export interface IHourlyInfoTransformed {
  status: number
  temperature: number
  rain: number
  snow: number
  time: number
  precipitationProbability: number
}

export interface ISunsetTransformed {
  sunrise: string,
  sunset: string,
  timeNow: string
}

export interface IDailyInfoTransformed {
  status: number
  temperatureMin: number
  temperatureMax: number
  rain: number
  snow: number
  date: number | string | Date
  precipitationProbability: number
}

export interface ICityNameTransformed {
  name: string
  timezone: string
}

export interface IPosByNameTransformed {
  id: string
  name: string,
  country: string,
  long: number,
  lat: number,
  timezone: string,
}
export interface IMainWeather {
  latitude:              number;
  longitude:             number;
  generationtime_ms:     number;
  utc_offset_seconds:    number;
  timezone:              string;
  timezone_abbreviation: string;
  elevation:             number;
  current_weather:       CurrentWeather;
  hourly_units:          HourlyUnits;
  hourly:                Hourly;
  daily_units:           DailyUnits;
  daily:                 Daily;
}

export interface CurrentWeather {
  temperature:   number;
  windspeed:     number;
  winddirection: number;
  weathercode:   number;
  is_day:        number;
  time:          string;
}

export interface Daily {
  time:               Date[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface DailyUnits {
  time:               string;
  temperature_2m_max: string;
  temperature_2m_min: string;
}

export interface Hourly {
  time:                      string[];
  precipitation_probability: number[];
  apparent_temperature:      number[];
  rain:                      number[];
  snowfall:                  number[];
}

export interface HourlyUnits {
  time:                      string;
  precipitation_probability: string;
  apparent_temperature:      string;
  rain:                      string;
  snowfall:                  string;
}

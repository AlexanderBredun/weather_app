import { Daily, DailyUnits } from "./IMainInfo"

export interface IDailyInfo {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  daily_units: DailyUnitsExtended
  daily: DailyExtended
}

interface DailyUnitsExtended extends DailyUnits {
  weathercode: string
  rain_sum: string
  snowfall_sum: string
  precipitation_probability_max: number[];
}

interface DailyExtended extends Daily {
  weathercode: number[]
  rain_sum: number[]
  snowfall_sum: number[]
  precipitation_probability_max: number[];
}

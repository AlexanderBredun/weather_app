import { Hourly, HourlyUnits } from "./IMainInfo"

interface HourlyExtendedInfo extends Hourly {
  weathercode: number[];
  temperature_2m: number[];
}

export interface IHourlyInfo {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  hourly_units: HourlyUnits
  hourly: HourlyExtendedInfo
}

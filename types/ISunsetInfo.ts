export interface ISunsetInfo {
    latitude:              number;
    longitude:             number;
    generationtime_ms:     number;
    utc_offset_seconds:    number;
    timezone:              string;
    timezone_abbreviation: string;
    elevation:             number;
    daily_units:           DailyUnits;
    daily:                 Daily;
}

interface Daily {
    time:    Date[];
    sunrise: string[];
    sunset:  string[];
}

interface DailyUnits {
    time:    string;
    sunrise: string;
    sunset:  string;
}
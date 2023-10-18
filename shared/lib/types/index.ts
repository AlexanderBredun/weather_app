import { eLocalStorageKeys } from '../utils';
import { eTilesSize } from '../utils/consts';


export interface iPos {
    lat: number;
    long: number;
}

export interface iPosWithTimezone{
	pos: iPos;
	timezone: string;
}

export type tWeatherCodes = 0 | 1 | 2 | 3 | 45 | 48 | 51 | 53 | 61 | 63 | 80 | 81 | 55 | 65 | 82 | 56 | 57
| 66
| 67
| 71
| 73
| 77
| 85
| 75
| 86
| 95
| 96
| 99


export interface iLocation {
	pos: iPos
    city: string
	timezone: string
	/**
     * @param id eather string or 'current-position-id' for current position
     */
	id: 'current-position-id' | string;
}

export type tLocalStorageKeys = `${eLocalStorageKeys}`

export interface iWeatherCodeDone{
	img: string
	text: string
}
export interface iWindspeedDone{
	title: string
	text: string
}
export interface iStructureItem{
    id: string
    name: tTilesNames
    displayName: string
    size: tTilesSize
	refresh?: string
}

export interface iStructureItemWithAvailableBlocks {
    structure: Array<iStructureItem>
    availableBlocks: Array<iStructureItem>
}

export type tTilesNames = 'MainInfoTile' | 'HourlyWeatherTile' | 'DailyWeatherTile' | 'SunriseTile' | 'WindTile';
export type tTilesSize = `${eTilesSize}`;

export type {
	iGeocodeResponse,
	iResultGeocodeResponse,
	iGeocodeReversedResponse,
	iResultGeocodeReversed,
	iGeocodeReversedDone,
	iGeocodeDone
} from './geocoding';
import { iLocation, iStructureItemWithAvailableBlocks, tLocalStorageKeys } from '../types';
import { eLocalStorageKeys } from './consts';

export function getPosition(options?: PositionOptions): Promise<GeolocationPosition> {
	return new Promise((resolve, reject) => {
		return window.navigator.geolocation.getCurrentPosition(resolve, reject, { ...options, maximumAge: 0, enableHighAccuracy: true });
	});
}

export function getTimezone(){
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function addLocalStorage(name: eLocalStorageKeys.STRUCTURE, value?: undefined, rewrite?: undefined): [Record<string, iStructureItemWithAvailableBlocks>] | false;
export function addLocalStorage(name: eLocalStorageKeys.STRUCTURE, value: [Record<string, iStructureItemWithAvailableBlocks>], rewrite?: boolean): void | false;
export function addLocalStorage(name: eLocalStorageKeys.LOCATIONS, value?: undefined, rewrite?: undefined): iLocation[] | false;
export function addLocalStorage(name: eLocalStorageKeys.LOCATIONS, value: iLocation[], rewrite?: boolean): void | false;
export function addLocalStorage(name: tLocalStorageKeys, value?: any[], rewrite?: boolean): any | false {
    
	if (!value) {
		try {
			JSON.parse(localStorage.getItem(name)!);
		} catch (e) {
			return false;
		}
		return JSON.parse(localStorage.getItem(name)!);
	}
	if(rewrite){
		localStorage.setItem(name, JSON.stringify([...value]));
		return;
	}
	if(JSON.parse(localStorage.getItem(name)!)){
		const valueExisted = JSON.parse(localStorage.getItem(name)!);
		valueExisted.push(...value);
		localStorage.setItem(name, JSON.stringify(valueExisted));
	}
	else{
		localStorage.setItem(name, JSON.stringify([...value]));
	}
  
}
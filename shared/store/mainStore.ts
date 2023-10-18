import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { getCityName } from '../api/geocodingService';
import { iLocation, iPos } from '../lib/types';
import { addLocalStorage, eLocalStorageKeys, getPosition } from '../lib/utils';
import { useStructureStore } from './structureStore';

interface MainStoreSchema {
	locations: iLocation[]
	loading: boolean
	slideToLocation: number
	editLayout: boolean
	isAddCityActive: boolean
}

export const useMainStore = defineStore({
	id: 'mainStore',

	state: (): MainStoreSchema => {

		return {
			locations: [],
			loading: true,
			slideToLocation: 0,
			editLayout: false,
			isAddCityActive: false
		};

	},
	getters: {

	},
	actions: {
		async addPositionActive(pos?: iPos) {
			
			const { addLocationStructure } = useStructureStore();
			if (pos) {
				getCityName(pos)
					.then((city) => {
						const currentItem = {
							pos: pos,
							city: city.name,
							timezone: city.timezone,
							id: uuidv4()
						};
						this.locations.push(currentItem);
						addLocalStorage(eLocalStorageKeys.LOCATIONS, [currentItem]);
						addLocationStructure(currentItem.id);
					})
					.finally(() => this.loading = false);
			}
			else {
				this.loading = true;

				await getPosition()
					.then((position) => {
						const lat = position.coords.latitude;
						const long = position.coords.longitude;
						
						getCityName({ lat, long })
							.then((city) => {
								const currentItem: iLocation = {
									pos: { lat, long },
									city: city.name,
									timezone: city.timezone,
									id: 'current-position-id'
								};
								const locationsLocalStore = addLocalStorage(eLocalStorageKeys.LOCATIONS);
								
								if (locationsLocalStore) {
									this.locations.push(currentItem, ...locationsLocalStore);
								}
								else {
									this.locations.push(currentItem);
								}
								addLocationStructure(currentItem.id, true);
							})
							.finally(() => this.loading = false);

					})
					.catch((err) => {
						console.log(err);
						this.loading = false;
					});

			}
		},
		removeLocation(id: string) {
			const { removeLocationStructure } = useStructureStore();
			this.locations = this.locations.filter(loc => loc.id !== id);
			const remainedLocations = this.locations.slice(1).filter(el => el.id !== id);
			if (remainedLocations.length) {
				addLocalStorage(eLocalStorageKeys.LOCATIONS, remainedLocations, true);
			}
			else {
				localStorage.removeItem(eLocalStorageKeys.LOCATIONS);
			}

			removeLocationStructure(id);
		},
	}
});


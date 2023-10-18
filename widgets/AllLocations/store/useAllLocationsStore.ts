
import { defineStore } from 'pinia';
import { getMainInfoPending, mainInfoFormatter } from '~/shared/api/weatherService';
import { iMainWeatherDone } from '~/shared/lib/types/weather';


interface AllLocationsStoreSchema {
	loading: boolean;
	items: iMainWeatherDone[] | null
}

export const useAllLocationsStore = defineStore({
	id: 'allLocationsStore',
	state: (): AllLocationsStoreSchema => {

		return {
			items: null,
			loading: false,
		};

	},
	actions: {
		fetchAllLocationsInfo() {
			this.loading = true;
			const { locations } = useMainStore();

			const allPromises = locations.map(el => {
				return getMainInfoPending(el.pos, el.timezone);
			});
			
			Promise.all(allPromises)
			        .then(values => {
			           this.items = values.map(el => mainInfoFormatter(el.data));
			        })
				.catch(e => console.log(e))
				.finally(()=> this.loading = false);
		}
	}
});



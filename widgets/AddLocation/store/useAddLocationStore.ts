import { defineStore } from 'pinia';
import { getPosByNameWithAborter } from '~/shared/api/geocodingService';
import { iGeocodeDone } from '~/shared/lib/types';


interface AddLocationStoreSchema{
    search: string;
	searchResult: iGeocodeDone[] | null
	loading: boolean
	searchFocused: boolean
	activeLocation: iGeocodeDone | null
}
const getPosByName = getPosByNameWithAborter();


export const useAddLocationStore = defineStore({
	id: 'addLocationStore',
	state: (): AddLocationStoreSchema => {

		return {
			search: '',
			searchFocused: false,
			loading: false,
			searchResult: null,
			activeLocation: null,
		};

	},
	actions: {
		fetchLocationsByName(){
			this.loading = true;
			getPosByName(this.search)
				.then((data)=> {
					this.searchResult = data;
				})
				.finally(()=> this.loading = false);
		}
	}
});



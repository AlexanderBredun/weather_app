import { defineStore } from 'pinia';
import { iStructureItem, iStructureItemWithAvailableBlocks, tTilesSize } from '../lib/types';
import { addLocalStorage, availableBlocksDefault, eLocalStorageKeys, structureDefault } from '../lib/utils';


interface StructureStoreSchema{
    locationsStructurees: Record<string, iStructureItemWithAvailableBlocks>
}

export const findPropertyById = (obj: Record<string, iStructureItemWithAvailableBlocks>, id: string) => {
	let item;
	for (const property in obj) {
		if (obj[property].structure.some(el => el.id === id)) {
			item = obj[property];
			break;
		}
	}
	return item;
};

export const useStructureStore = defineStore({
	id: 'structureStore',
	state: (): StructureStoreSchema => {

		return {
			locationsStructurees: {},
		};

	},
	actions: {

		addLocationStructure(id: string, init?: boolean) {
			const localStorageStucture = addLocalStorage(eLocalStorageKeys.STRUCTURE);
            
			if (init) {
				if (!localStorageStucture) {
					this.locationsStructurees[id] = {
						structure: structureDefault(),
						availableBlocks: availableBlocksDefault()
					};
				}
				else {
					this.locationsStructurees = localStorageStucture[0];
				}
			}
			else {
				this.locationsStructurees[id] = {
					structure: structureDefault(),
					availableBlocks: availableBlocksDefault()
				};
			}

		},
		removeLocationStructure(id: string) {

			delete this.locationsStructurees[id];

		},
		setTileSize(id: string, size: tTilesSize) {
			const item = findPropertyById(this.locationsStructurees, id);
			if(item){
				item.structure = item.structure.map(el => {
					if (el.id === id) {
						return {
							...el,
							size
						};
					}
					return el;
				});
				
			}
		},
		addTile(item: iStructureItem, id: string) {
			const parentItem = this.locationsStructurees[id];
			if(parentItem){
				parentItem.availableBlocks = parentItem.availableBlocks.filter(el => el.id !== item.id);
				parentItem.structure.push(item);
				
			}
		},
		removeTile(id: string) {
			const item = findPropertyById(this.locationsStructurees, id);
			if(item){
				const removedStrucktureItem = item.structure.find(el => el.id === id);
				
				if (removedStrucktureItem) {
					item.availableBlocks.push(removedStrucktureItem);
				}
				item.structure = item.structure.filter(el => el.id !== id);
			}
		},
		addRefreshMethod(id: string, method: string) {
			const item = findPropertyById(this.locationsStructurees, id);
			if(item){
				item.structure = item.structure.map(el => {
					if (el.id === id) {
						return {
							...el,
							refresh: method
						};
					}
					return el;
				});
			}
			
		},
		// addAvailableBlock(item: IInfoItem, id: string) {
		// 	const removedStrucktureItem = item.structure.find(el => el.id === id);
		// 	console.log(removedStrucktureItem);

		// 	if (removedStrucktureItem) {
		// 		item.availableBlocks.push(removedStrucktureItem);
		// 	}

		// },
		// removeAvailableBlock(item: IStructureItem, parentItem: IInfoItem) {
		// 	parentItem.availableBlocks = parentItem.availableBlocks.filter(el => el.id !== item.id);
		// }
	}
});



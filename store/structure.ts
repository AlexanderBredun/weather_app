import { defineStore } from "pinia";
import { structureDefault, availableBlocksDefault } from '@/utils/constants'
import { useLocalStorage } from '@/utils/funcs'

interface IStructureItem {
    id: string
    name: string
    displayName: string
    size: string
    refresh?: string
}
interface IInfoItem {
    structure: Array<IStructureItem>
    availableBlocks: Array<IStructureItem>
}

export const findPropertyById = (obj: Record<string, IInfoItem>, id: string): IInfoItem | undefined => {
    let item;
    for (const property in obj) {
        if (obj[property].structure.some(el => el.id === id)) {
            item = obj[property]
            break;
        }

    }
    return item;
}

export const useStructureStore = defineStore({
    id: 'structureStore',
    state: () => {

        return {
            locationsStructurees: {} as Record<string, IInfoItem>,
        }

    },
    getters: {

    },
    actions: {

        addStructureToLocalStore() {
            useLocalStorage('structureStore', this.locationsStructurees, true)
        },

        addLocationStructure(id: string, init?: boolean) {
            const localStorageStucture = useLocalStorage('structureStore');
            
            if (init) {
                if (!localStorageStucture) {
                    this.locationsStructurees[id] = {
                        structure: structureDefault(),
                        availableBlocks: availableBlocksDefault()
                    }
                }
                else {
                    this.locationsStructurees = localStorageStucture[0]
                }
            }
            else {
                this.locationsStructurees[id] = {
                    structure: structureDefault(),
                    availableBlocks: availableBlocksDefault()
                }
            }

            
            this.addStructureToLocalStore()
        },
        removeLocationStructure(id: string) {

            delete this.locationsStructurees[id]

            this.addStructureToLocalStore()
        },
        setTileSize(id: string, size: string) {

            const item = findPropertyById(this.locationsStructurees, id)
            if(item){
                item.structure = item.structure.map(el => {
                    if (el.id === id) {
                        return {
                            ...el,
                            size
                        }
                    }
                    return el
                })
                this.addStructureToLocalStore()
            }
        },
        addTile(item: IStructureItem, id: string) {
            const parentItem = this.locationsStructurees[id];

            this.removeAvailableBlock(item, parentItem)
            parentItem.structure.push(item)
            this.addStructureToLocalStore()
        },
        removeTile(id: string) {
            const item = findPropertyById(this.locationsStructurees, id)
            if(item){
                this.addAvailableBlock(item, id)
                item.structure = item.structure.filter(el => el.id !== id)
                this.addStructureToLocalStore()
            }
        },
        addRefreshMethod(id: string, method: string) {
            const item = findPropertyById(this.locationsStructurees, id)
            if(item){
                item.structure = item.structure.map(el => {
                    if (el.id === id) {
                        return {
                            ...el,
                            refresh: method
                        }
                    }
                    return el
                })
    
                this.addStructureToLocalStore()
            }
        },
        addAvailableBlock(item: IInfoItem, id: string) {
            const removedStrucktureItem: undefined | IStructureItem = item.structure.find(el => el.id === id);
           
            if (removedStrucktureItem) {
                item.availableBlocks.push(removedStrucktureItem)
            }

        },
        removeAvailableBlock(item: IStructureItem, parentItem: IInfoItem) {
            parentItem.availableBlocks = parentItem.availableBlocks.filter(el => el.id !== item.id)
        }
    }
});

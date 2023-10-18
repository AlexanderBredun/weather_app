import { v4 as uuidv4 } from 'uuid';
import { defineStore } from 'pinia'

import geocodingService from '@/services/geocodingService'
import { getPosition, useLocalStorage } from '@/utils/funcs'

import { IPos } from '~/types/IPos';
import { ICityNameTransformed } from '~/types/transormedData';

interface ILocation{
    pos: IPos
    city: string
    timezone: string
    id: string
}

export const useMainStore = defineStore({
    id: 'mainStore',
   
    state: () => {

        return {
            locations: [] as Array<ILocation>,
            loading: true as boolean,
            slideToLocation: 0 as number,
            editLayout: false as boolean,
            addCityActive: false as boolean
        }

    },
    actions: {
        async addPositionActive(pos?: IPos): Promise<void> {
            this.loading = true;
            let currentItem: undefined | ILocation; 
            const {addLocationStructure} = useStructureStore();
            if (pos) {
               
                await this.addCityActive(pos)
                    .then((city: ICityNameTransformed) => {
                       
                        currentItem = { pos: pos, city: city.name, timezone: city.timezone, id: uuidv4() }
                        this.locations.push(currentItem)
                        useLocalStorage('positions', currentItem)
                        addLocationStructure(currentItem.id)
                       
                    })
                    .finally(() =>  this.loading = false)
            }
            else {
                await getPosition()
                    .then((position) => {

                        const lat = position.coords.latitude;
                        const long = position.coords.longitude;
                        return { lat, long }

                    })
                    .then((resPos) => {
                       
                        this.addCityActive(resPos)
                            .then((city) => {
                                const locationsLocalStore = useLocalStorage('positions')
                                currentItem = { pos: resPos, city: city.name, timezone: city.timezone, id: 'current-position-id' };
                                if(locationsLocalStore){
                                    this.locations.push(currentItem, ...locationsLocalStore)
                                }
                                else{
                                    this.locations.push(currentItem)
                                }
                                addLocationStructure(currentItem.id, true)
                                this.loading = false
                            })

                    })
                    .catch((err) => {
                        console.log(err);
                        this.loading = false
                    })
                   
            }
        },
        removeLocation(id: string){
            const {removeLocationStructure} = useStructureStore();
            this.locations = this.locations.filter(loc => loc.id !== id);
            const remainedLocations = this.locations.slice(1).filter(el => el.id !== id)
            if(remainedLocations.length){
                useLocalStorage('positions', ...remainedLocations, true)
            }
            else{
                localStorage.removeItem('positions')
            }
            
            removeLocationStructure(id)
        },
        addCityActive(pos: IPos): Promise<ICityNameTransformed> {
            return geocodingService.getCityName(pos)
                .then(res => res)
        }
    }
});


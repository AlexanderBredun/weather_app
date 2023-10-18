import { v4 as uuidv4 } from 'uuid';
import { IGeocode as GeocodeReversed } from '@/types/IGeocode'
import { IPos } from '~/types/IPos';
import { ICityNameTransformed, IPosByNameTransformed } from '~/types/transormedData';
import { IPosByName } from '~/types/IPosByName';


class GeocodingService {
    #baseReverse = 'https://api.geoapify.com/v1/geocode/reverse'
    #base = 'https://geocoding-api.open-meteo.com/v1/search'
    #keyReverse = '47314880999c4bfe81dc009f856162f4'

    async getCityName(pos: IPos): Promise<ICityNameTransformed> {
       
        return await fetch(`${this.#baseReverse}?lat=${pos.lat}&lon=${pos.long}&format=json&apiKey=${this.#keyReverse}`)
        .then(data => data.json())
        .then(res => [res].map(this.#getCityNameFormatter)[0])
        .catch(e => {
            console.log(e)
            return {
                name: `Unknown city name`,
                timezone: 'Europe/Kiev'
            }
        })
    }

    getPosByName(name: string): string {
        return `${this.#base}?name=${name}&count=10`
    } 

    #getCityNameFormatter(data: GeocodeReversed): ICityNameTransformed{
        const { results } = data;
      
        const city = results[0].city || results[0].county || results[0].state || '';
        return {
            name: `${city ? city + ', ' : ''}${results[0].country}`,
            timezone: results[0].timezone.name
        }
    }

    getPosByNameFormatter(data: IPosByName): IPosByNameTransformed[]{
        const { results } = data;
        if(!results) return []
        return results.map( el => {
            return {
                id: uuidv4(),
                name: el.name,
                country: el.country,
                long: el.longitude,
                lat: el.latitude,
                timezone: el.timezone,
            }
        })
        
    }
}


export default new GeocodingService()
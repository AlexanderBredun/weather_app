import {  iGeocodeDone, iGeocodeResponse, iGeocodeReversedDone, iGeocodeReversedResponse, iPos, iResultGeocodeReversed } from '../lib/types';
import { $api } from './apiClient';


async function getCityName(pos: iPos): Promise<iGeocodeReversedDone> {
	return await $api.geocodingReversed<iGeocodeReversedResponse>(`?lat=${pos.lat}&lon=${pos.long}&format=json&apiKey=${import.meta.env.VITE_KEY_GEOCODING_REVERSED}`)
		.then(res => res.data.results.map(getCityNameFormatter)[0]);
	// const mock = {
	// 	'results': [
	// 		{
	// 			'datasource': {
	// 				'sourcename': 'openstreetmap',
	// 				'attribution': '© OpenStreetMap contributors',
	// 				'license': 'Open Database License',
	// 				'url': 'https://www.openstreetmap.org/copyright'
	// 			},
	// 			'name': 'Call a Bike',
	// 			'country': 'Germany',
	// 			'country_code': 'de',
	// 			'state': 'Hesse',
	// 			'city': 'Frankfurt',
	// 			'postcode': '60311',
	// 			'district': 'Innenstadt 1',
	// 			'suburb': 'Altstadt',
	// 			'street': 'Braubachstraße',
	// 			'lon': 8.68216,
	// 			'lat': 50.11089,
	// 			'distance': 4.287090983018379,
	// 			'result_type': 'amenity',
	// 			'county': 'Frankfurt',
	// 			'formatted': 'Call a Bike, Braubachstraße, 60311 Frankfurt, Germany',
	// 			'address_line1': 'Call a Bike',
	// 			'address_line2': 'Braubachstraße, 60311 Frankfurt, Germany',
	// 			'category': 'rental.bicycle',
	// 			'timezone': {
	// 				'name': 'Europe/Berlin',
	// 				'offset_STD': '+01:00',
	// 				'offset_STD_seconds': 3600,
	// 				'offset_DST': '+02:00',
	// 				'offset_DST_seconds': 7200,
	// 				'abbreviation_STD': 'CET',
	// 				'abbreviation_DST': 'CEST'
	// 			},
	// 			'plus_code': '9F2C4M6J+9V',
	// 			'rank': {
	// 				'importance': 0.00000999999999995449,
	// 				'popularity': 9.995467104553104
	// 			},
	// 			'place_id': '515a475513445d2140590ababda4310e4940f00103f901f3bb3afe00000000c0020192030b43616c6c20612042696b65e203236f70656e7374726565746d61703a76656e75653a6e6f64652f34323635323632303637',
	// 			'bbox': {
	// 				'lon1': 8.68211,
	// 				'lat1': 50.11084,
	// 				'lon2': 8.68221,
	// 				'lat2': 50.11094
	// 			}
	// 		}
	// 	],
	// 	'query': {
	// 		'lat': 50.1109221,
	// 		'lon': 8.6821267,
	// 		'plus_code': '9F2C4M6J+9V'
	// 	}
	// };
	// return mock.results.map(getCityNameFormatter)[0];
}

function getPosByNameWithAborter(): (name: string) => Promise<iGeocodeDone[]>   {
	let aborter: AbortController | null = null;
	return (name) => {
		
		if (aborter) aborter.abort();
		aborter = new AbortController();
		
		const signal = aborter.signal;
		return $api.geocoding<iGeocodeResponse>(`?name=${name}&count=10`, { signal })
			.then(res => {
				aborter = null;
				return getPosByNameFormatter(res.data);
			});
	};
	
}

function getCityNameFormatter(data: iResultGeocodeReversed): iGeocodeReversedDone{
	
	const city = data.city || data.county || data.state || '';
	return {
		name: `${city ? city + ', ' : ''}${data.country}`,
		timezone: data.timezone.name
	};
}

function getPosByNameFormatter(data: iGeocodeResponse): iGeocodeDone[]{
	const { results } = data;
	if(!results) return [];
	return results.map( el => {
		return {
			id: el.id,
			name: el.name,
			country: el.country,
			long: el.longitude,
			lat: el.latitude,
			timezone: el.timezone,
		};
	});
	
}

export {
	getCityName,
	getPosByNameWithAborter,
	getPosByNameFormatter
};
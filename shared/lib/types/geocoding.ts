
export interface iGeocodeResponse {
  results: iResultGeocodeResponse[];
  generationtime_ms: number;
}
export interface iGeocodeDone {
  id: number;
  name: string,
  country: string,
  long: number,
  lat: number,
  timezone: string,
}


export interface iResultGeocodeResponse {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin3: string;
  admin4: string;
  state: string;
  county: string;
}

export interface iGeocodeReversedDone {
  name: string;
  timezone: string;
}

export interface iGeocodeReversedResponse {
  results: iResultGeocodeReversed[]
}

export interface iResultGeocodeReversed {
  datasource?: Datasource;
  country?: string;
  country_code?: string;
  region?: string;
  state?: string;
  county?: string;
  city?: string;
  postcode?: string;
  district?: string;
  street?: string;
  housenumber?: string;
  lon?: number;
  lat?: number;
  distance?: number;
  result_type?: string;
  formatted?: string;
  address_line1?: string;
  address_line2?: string;
  category?: string;
  timezone: Timezone;
  plus_code?: string;
  plus_code_short?: string;
  rank?: Rank;
  place_id?: string;
  bbox?: Bbox;
}

interface Datasource {
  sourcename?: string;
  attribution?: string;
  license?: string;
  url?: string;
}

interface Timezone {
  name: string;
  offset_STD?: string;
  offset_STD_seconds?: number;
  offset_DST?: string;
  offset_DST_seconds?: number;
  abbreviation_STD?: string;
  abbreviation_DST?: string;
}

interface Rank {
  importance?: number;
  popularity?: number;
}

interface Bbox {
  lon1?: number;
  lat1?: number;
  lon2?: number;
  lat2?: number;
}

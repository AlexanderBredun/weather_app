export interface IGeocode {
    results: Result[]
  }
  
  export interface Result {
    country_code:  string;
    name:          string;
    housenumber:   string;
    street:        string;
    country:       string;
    county:        string;
    datasource:    Datasource;
    state:         string;
    city:          string;
    lon:           number;
    lat:           number;
    distance:      number;
    result_type:   string;
    postcode:      string;
    formatted:     string;
    address_line1: string;
    address_line2: string;
    timezone:      Timezone;
    rank:          Rank;
    place_id:      string;
}

export interface Datasource {
    sourcename:  string;
    attribution: string;
    license:     string;
    url:         string;
}

export interface Rank {
    popularity: number;
}

export interface Timezone {
    name:               string;
    name_alt:           string;
    offset_STD:         string;
    offset_STD_seconds: number;
    offset_DST:         string;
    offset_DST_seconds: number;
    abbreviation_STD:   string;
    abbreviation_DST:   string;
}
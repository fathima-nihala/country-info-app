export interface CountryListItem {
  name: string;
  code: string;
  capital: string;
  region: string;
  population: number;
  flag: string;
  timezones: string[];
}

export interface CountryDetail extends CountryListItem {
  officialName: string;
  subregion: string;
  area: number;
  currencies: Array<{
    code: string;
    name: string;
    symbol: string;
  }>;
  languages: string[];
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  coordinates: number[];
  borders: string[];
  independent: boolean;
  unMember: boolean;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

import { Country, CountryListItem, CountryDetail } from '../types';

export const transformToListItem = (country: Country): CountryListItem => ({
  name: country.name.common,
  code: country.cca2,
  capital: country.capital?.[0] || 'N/A',
  region: country.region,
  population: country.population,
  flag: country.flags.svg,
  timezones: country.timezones
});

export const transformToDetail = (country: Country): CountryDetail => ({
  name: country.name.common,
  officialName: country.name.official,
  code: country.cca2,
  capital: country.capital?.[0] || 'N/A',
  region: country.region,
  subregion: country.subregion || 'N/A',
  population: country.population,
  area: country.area,
  flag: country.flags.svg,
  timezones: country.timezones,
  currencies: country.currencies ? 
    Object.entries(country.currencies).map(([code, currency]) => ({
      code,
      name: currency.name,
      symbol: currency.symbol
    })) : [],
  languages: country.languages ? Object.values(country.languages) : [],
  maps: country.maps,
  coordinates: country.latlng,
  borders: country.borders || [],
  independent: country.independent || false,
  unMember: country.unMember || false
});

export const filterCountries = (
  countries: CountryListItem[],
  query: any
): CountryListItem[] => {
  return countries.filter(country => {
    if (query.name && !country.name.toLowerCase().includes(query.name.toLowerCase())) {
      return false;
    }
    if (query.capital && !country.capital.toLowerCase().includes(query.capital.toLowerCase())) {
      return false;
    }
    if (query.region && country.region !== query.region) {
      return false;
    }
    if (query.timezone && !country.timezones.some(tz => 
      tz.toLowerCase().includes(query.timezone.toLowerCase())
    )) {
      return false;
    }
    return true;
  });
};

export const paginateResults = <T>(
  items: T[],
  page: number,
  limit: number
): { items: T[]; hasMore: boolean } => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  const hasMore = endIndex < items.length;

  return { items: paginatedItems, hasMore };
};
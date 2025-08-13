"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateResults = exports.filterCountries = exports.transformToDetail = exports.transformToListItem = void 0;
const transformToListItem = (country) => ({
    name: country.name.common,
    code: country.cca2,
    capital: country.capital?.[0] || 'N/A',
    region: country.region,
    population: country.population,
    flag: country.flags.svg,
    timezones: country.timezones
});
exports.transformToListItem = transformToListItem;
const transformToDetail = (country) => ({
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
exports.transformToDetail = transformToDetail;
const filterCountries = (countries, query) => {
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
        if (query.timezone && !country.timezones.some(tz => tz.toLowerCase().includes(query.timezone.toLowerCase()))) {
            return false;
        }
        return true;
    });
};
exports.filterCountries = filterCountries;
const paginateResults = (items, page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = items.slice(startIndex, endIndex);
    const hasMore = endIndex < items.length;
    return { items: paginatedItems, hasMore };
};
exports.paginateResults = paginateResults;
//# sourceMappingURL=helpers.js.map
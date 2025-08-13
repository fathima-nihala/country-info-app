import { Country, CountryListItem, CountryDetail } from '../types';
export declare const transformToListItem: (country: Country) => CountryListItem;
export declare const transformToDetail: (country: Country) => CountryDetail;
export declare const filterCountries: (countries: CountryListItem[], query: any) => CountryListItem[];
export declare const paginateResults: <T>(items: T[], page: number, limit: number) => {
    items: T[];
    hasMore: boolean;
};
//# sourceMappingURL=helpers.d.ts.map
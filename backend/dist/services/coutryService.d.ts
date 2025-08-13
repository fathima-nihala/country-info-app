import { CountryListItem, CountryDetail, SearchQuery } from '../types';
declare class CountryService {
    private baseUrl;
    private cache;
    private makeRequest;
    getAllCountries(): Promise<CountryListItem[]>;
    getCountryByCode(code: string): Promise<CountryDetail>;
    getCountriesByRegion(region: string): Promise<CountryListItem[]>;
    searchCountries(query: SearchQuery): Promise<{
        countries: CountryListItem[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            hasMore: boolean;
        };
    }>;
    clearCache(): void;
}
declare const _default: CountryService;
export default _default;
//# sourceMappingURL=coutryService.d.ts.map
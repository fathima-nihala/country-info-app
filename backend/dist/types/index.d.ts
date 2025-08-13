export interface Country {
    name: {
        common: string;
        official: string;
    };
    cca2: string;
    cca3: string;
    capital?: string[];
    region: string;
    subregion?: string;
    population: number;
    area: number;
    timezones: string[];
    currencies?: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    languages?: {
        [key: string]: string;
    };
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    };
    latlng: number[];
    borders?: string[];
    independent?: boolean;
    unMember?: boolean;
}
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
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        hasMore: boolean;
    };
}
export interface SearchQuery {
    name?: string;
    capital?: string;
    region?: string;
    timezone?: string;
    page?: number;
    limit?: number;
}
//# sourceMappingURL=index.d.ts.map
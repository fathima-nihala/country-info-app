"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const helpers_1 = require("../utils/helpers");
const constants_1 = require("../utils/constants");
class CountryService {
    constructor() {
        this.baseUrl = 'https://restcountries.com/v3.1';
        this.cache = new Map();
    }
    async makeRequest(url, cacheKey, cacheDuration) {
        const cached = this.cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < cacheDuration) {
            return cached.data;
        }
        try {
            const response = await axios_1.default.get(url, {
                timeout: 10000,
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'CountryInfoApp/1.0'
                }
            });
            this.cache.set(cacheKey, {
                data: response.data,
                timestamp: Date.now()
            });
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new Error('Country not found');
                }
                if (error.code === 'ECONNABORTED') {
                    throw new Error('Request timeout - please try again');
                }
                throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
            }
            throw new Error('An unexpected error occurred');
        }
    }
    async getAllCountries() {
        const countries = await this.makeRequest(`${this.baseUrl}/all?fields=name,cca2,capital,region,population,flags,timezones`, 'all-countries', constants_1.CACHE_DURATION.COUNTRIES);
        return countries.map(helpers_1.transformToListItem);
    }
    async getCountryByCode(code) {
        const countries = await this.makeRequest(`${this.baseUrl}/alpha/${code.toUpperCase()}`, `country-${code}`, constants_1.CACHE_DURATION.COUNTRY_DETAIL);
        if (!countries || countries.length === 0) {
            throw new Error('Country not found');
        }
        return (0, helpers_1.transformToDetail)(countries[0]);
    }
    async getCountriesByRegion(region) {
        const countries = await this.makeRequest(`${this.baseUrl}/region/${encodeURIComponent(region)}?fields=name,cca2,capital,region,population,flags,timezones`, `region-${region}`, constants_1.CACHE_DURATION.COUNTRIES);
        return countries.map(helpers_1.transformToListItem);
    }
    async searchCountries(query) {
        const allCountries = await this.getAllCountries();
        const filteredCountries = (0, helpers_1.filterCountries)(allCountries, query);
        const page = query.page || 1;
        const limit = query.limit || 20;
        const { items, hasMore } = (0, helpers_1.paginateResults)(filteredCountries, page, limit);
        return {
            countries: items,
            pagination: {
                total: filteredCountries.length,
                page,
                limit,
                hasMore
            }
        };
    }
    clearCache() {
        this.cache.clear();
    }
}
exports.default = new CountryService();
//# sourceMappingURL=coutryService.js.map
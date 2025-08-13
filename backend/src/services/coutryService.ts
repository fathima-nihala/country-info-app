import axios from 'axios';
import { Country, CountryListItem, CountryDetail, SearchQuery } from '../types';
import { transformToListItem, transformToDetail, filterCountries, paginateResults } from '../utils/helpers';
import { CACHE_DURATION } from '../utils/constants';

class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';
  private cache = new Map<string, { data: any; timestamp: number }>();

  private async makeRequest<T>(url: string, cacheKey: string, cacheDuration: number): Promise<T> {
    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cacheDuration) {
      return cached.data;
    }

    try {
      const response = await axios.get<T>(url, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'CountryInfoApp/1.0'
        }
      });

      // Cache the result
      this.cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now()
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
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

  async getAllCountries(): Promise<CountryListItem[]> {
    const countries = await this.makeRequest<Country[]>(
      `${this.baseUrl}/all?fields=name,cca2,capital,region,population,flags,timezones`,
      'all-countries',
      CACHE_DURATION.COUNTRIES
    );

    return countries.map(transformToListItem);
  }

  async getCountryByCode(code: string): Promise<CountryDetail> {
    const countries = await this.makeRequest<Country[]>(
      `${this.baseUrl}/alpha/${code.toUpperCase()}`,
      `country-${code}`,
      CACHE_DURATION.COUNTRY_DETAIL
    );

    if (!countries || countries.length === 0) {
      throw new Error('Country not found');
    }

    return transformToDetail(countries[0]);
  }

  async getCountriesByRegion(region: string): Promise<CountryListItem[]> {
    const countries = await this.makeRequest<Country[]>(
      `${this.baseUrl}/region/${encodeURIComponent(region)}?fields=name,cca2,capital,region,population,flags,timezones`,
      `region-${region}`,
      CACHE_DURATION.COUNTRIES
    );

    return countries.map(transformToListItem);
  }

  async searchCountries(query: SearchQuery): Promise<{
    countries: CountryListItem[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      hasMore: boolean;
    };
  }> {
    // Get all countries for comprehensive search
    const allCountries = await this.getAllCountries();
    
    // Filter based on search criteria
    const filteredCountries = filterCountries(allCountries, query);
    
    // Apply pagination
    const page = query.page || 1;
    const limit = query.limit || 20;
    const { items, hasMore } = paginateResults(filteredCountries, page, limit);

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

  clearCache(): void {
    this.cache.clear();
  }
}

export default new CountryService();

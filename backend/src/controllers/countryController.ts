import { Request, Response } from 'express';
import countryService from '../services/coutryService';
import { ApiResponse, CountryListItem, CountryDetail, SearchQuery } from '../types';
import { asyncHandler } from '../middleware/async';

class CountryController {
  getAllCountries = asyncHandler(async (req: Request, res: Response<ApiResponse<CountryListItem[]>>) => {
    const { page = 1, limit = 20 } = req.query as any;
    
    const countries = await countryService.getAllCountries();
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCountries = countries.slice(startIndex, endIndex);
    const hasMore = endIndex < countries.length;

    res.json({
      success: true,
      data: paginatedCountries,
      pagination: {
        total: countries.length,
        page: Number(page),
        limit: Number(limit),
        hasMore
      }
    });
  });

  getCountryByCode = asyncHandler(async (req: Request, res: Response<ApiResponse<CountryDetail>>) => {
    const { code } = req.params;
    
    const country = await countryService.getCountryByCode(code);
    
    res.json({
      success: true,
      data: country
    });
  });

  getCountriesByRegion = asyncHandler(async (req: Request, res: Response<ApiResponse<CountryListItem[]>>) => {
    const { region } = req.params;
    const { page = 1, limit = 20 } = req.query as any;
    
    const countries = await countryService.getCountriesByRegion(region);
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCountries = countries.slice(startIndex, endIndex);
    const hasMore = endIndex < countries.length;

    res.json({
      success: true,
      data: paginatedCountries,
      pagination: {
        total: countries.length,
        page: Number(page),
        limit: Number(limit),
        hasMore
      }
    });
  });

  searchCountries = asyncHandler(async (req: Request, res: Response<ApiResponse<CountryListItem[]>>) => {
    const query = req.query as SearchQuery;
    
    const result = await countryService.searchCountries(query);
    
    res.json({
      success: true,
      data: result.countries,
      pagination: result.pagination
    });
  });

  clearCache = asyncHandler(async (req: Request, res: Response<ApiResponse<string>>) => {
    countryService.clearCache();
    
    res.json({
      success: true,
      data: 'Cache cleared successfully'
    });
  });
}

export default new CountryController();

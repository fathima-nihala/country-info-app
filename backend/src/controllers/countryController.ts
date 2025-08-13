import { Request, Response } from 'express';
import countryService from '../services/coutryService';
import { ApiResponse, CountryListItem, CountryDetail, SearchQuery } from '../types';
import { asyncHandler } from '../middleware/async';

// Extend Request interface to include validated data
interface ValidatedRequest extends Request {
  validatedQuery?: any;
  validatedParams?: any;
}

class CountryController {
  getAllCountries = asyncHandler(async (req: ValidatedRequest, res: Response<ApiResponse<CountryListItem[]>>) => {
    // Use validated query or fall back to original query
    const query = req.validatedQuery || req.query;
    const { page = 1, limit = 20 } = query;
    
    const countries = await countryService.getAllCountries();
    
    // Apply pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
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

  getCountryByCode = asyncHandler(async (req: ValidatedRequest, res: Response<ApiResponse<CountryDetail>>) => {
    // Use validated params or fall back to original params
    const params = req.validatedParams || req.params;
    const { code } = params;
    
    const country = await countryService.getCountryByCode(code);
    
    res.json({
      success: true,
      data: country
    });
  });

  getCountriesByRegion = asyncHandler(async (req: ValidatedRequest, res: Response<ApiResponse<CountryListItem[]>>) => {
    // Use validated params and query or fall back to originals
    const params = req.validatedParams || req.params;
    const query = req.validatedQuery || req.query;
    const { region } = params;
    const { page = 1, limit = 20 } = query;
    
    const countries = await countryService.getCountriesByRegion(region);
    
    // Apply pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
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

  searchCountries = asyncHandler(async (req: ValidatedRequest, res: Response<ApiResponse<CountryListItem[]>>) => {
    // Use validated query or fall back to original query
    const query = (req.validatedQuery || req.query) as SearchQuery;
    
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

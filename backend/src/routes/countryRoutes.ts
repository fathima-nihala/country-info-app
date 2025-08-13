import { Router } from 'express';
import countryController from '../controllers/countryController';
import { validateParams, validateQuery } from '../middleware/validation';
import { 
  countryCodeSchema, 
  regionSchema, 
  searchQuerySchema, 
  paginationSchema 
} from '../utils/validators';
import Joi from 'joi';

const router = Router();

// Create schema objects for validation
const countryCodeParamsSchema = Joi.object({
  code: countryCodeSchema
});

const regionParamsSchema = Joi.object({
  region: regionSchema
});

// GET /api/countries - Get all countries with pagination
router.get(
  '/',
  validateQuery(paginationSchema),
  countryController.getAllCountries
);

// GET /api/countries/search - Search countries
router.get(
  '/search',
  validateQuery(searchQuerySchema),
  countryController.searchCountries
);

// GET /api/countries/region/:region - Get countries by region
router.get(
  '/region/:region',
  validateParams(regionParamsSchema),
  validateQuery(paginationSchema),
  countryController.getCountriesByRegion
);

// GET /api/countries/:code - Get country by code
router.get(
  '/:code',
  validateParams(countryCodeParamsSchema),
  countryController.getCountryByCode
);

// DELETE /api/countries/cache - Clear cache (for development)
router.delete('/cache', countryController.clearCache);

export default router;

// import { Router } from 'express';
// import countryController from '../controllers/countryController';
// import { validateParams, validateQuery } from '../middleware/validation';
// import { 
//   countryCodeSchema, 
//   regionSchema, 
//   searchQuerySchema, 
//   paginationSchema 
// } from '../utils/validators';

// const router = Router();

// // GET /api/countries - Get all countries with pagination
// router.get(
//   '/',
//   validateQuery(paginationSchema),
//   countryController.getAllCountries
// );

// // GET /api/countries/search - Search countries
// router.get(
//   '/search',
//   validateQuery(searchQuerySchema),
//   countryController.searchCountries
// );

// // GET /api/countries/region/:region - Get countries by region
// router.get(
//   '/region/:region',
//   validateParams(regionSchema.keys({ region: regionSchema })),
//   validateQuery(paginationSchema),
//   countryController.getCountriesByRegion
// );

// // GET /api/countries/:code - Get country by code
// router.get(
//   '/:code',
//   validateParams(countryCodeSchema.keys({ code: countryCodeSchema })),
//   countryController.getCountryByCode
// );

// // DELETE /api/countries/cache - Clear cache (for development)
// router.delete('/cache', countryController.clearCache);

// export default router;


import { Router } from 'express';
import countryController from '../controllers/countryController';
import { validateParams, validateQuery } from '../middleware/validation';
import { 
  countryCodeParamSchema, 
  regionParamSchema, 
  searchQuerySchema, 
  paginationSchema 
} from '../utils/validators';

const router = Router();

router.get(
  '/',
  validateQuery(paginationSchema),
  countryController.getAllCountries
);

router.get(
  '/search',
  validateQuery(searchQuerySchema),
  countryController.searchCountries
);

router.get(
  '/region/:region',
  validateParams(regionParamSchema),
  validateQuery(paginationSchema),
  countryController.getCountriesByRegion
);

router.get(
  '/:code',
  validateParams(countryCodeParamSchema),
  countryController.getCountryByCode
);

router.delete('/cache', countryController.clearCache);

export default router;

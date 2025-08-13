// import Joi from 'joi';
// import { REGIONS } from './constants';

// export const countryCodeSchema = Joi.string()
//   .length(2)
//   .pattern(/^[A-Z]{2}$/)
//   .required()
//   .messages({
//     'string.length': 'Country code must be exactly 2 characters',
//     'string.pattern.base': 'Country code must contain only uppercase letters'
//   });

// export const regionSchema = Joi.string()
//   .valid(...REGIONS)
//   .required()
//   .messages({
//     'any.only': `Region must be one of: ${REGIONS.join(', ')}`
//   });

// export const searchQuerySchema = Joi.object({
//   name: Joi.string().min(1).max(100),
//   capital: Joi.string().min(1).max(100),
//   region: Joi.string().valid(...REGIONS),
//   timezone: Joi.string().min(1).max(50),
//   page: Joi.number().integer().min(1).default(1),
//   limit: Joi.number().integer().min(1).max(100).default(20)
// });

// export const paginationSchema = Joi.object({
//   page: Joi.number().integer().min(1).default(1),
//   limit: Joi.number().integer().min(1).max(100).default(20)
// });


import Joi from 'joi';
import { REGIONS } from './constants';

export const countryCodeSchema = Joi.string()
  .length(2)
  .pattern(/^[A-Z]{2}$/)
  .required()
  .messages({
    'string.length': 'Country code must be exactly 2 characters',
    'string.pattern.base': 'Country code must contain only uppercase letters'
  });

// Base region string schema
export const regionSchema = Joi.string()
  .valid(...REGIONS)
  .required()
  .messages({
    'any.only': `Region must be one of: ${REGIONS.join(', ')}`
  });

// Params schemas (for req.params validation)
export const countryCodeParamSchema = Joi.object({
  code: countryCodeSchema
});

export const regionParamSchema = Joi.object({
  region: regionSchema
});

export const searchQuerySchema = Joi.object({
  name: Joi.string().min(1).max(100),
  capital: Joi.string().min(1).max(100),
  region: Joi.string().valid(...REGIONS),
  timezone: Joi.string().min(1).max(50),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});

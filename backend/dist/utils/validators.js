"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchema = exports.searchQuerySchema = exports.regionParamSchema = exports.countryCodeParamSchema = exports.regionSchema = exports.countryCodeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("./constants");
exports.countryCodeSchema = joi_1.default.string()
    .length(2)
    .pattern(/^[A-Z]{2}$/)
    .required()
    .messages({
    'string.length': 'Country code must be exactly 2 characters',
    'string.pattern.base': 'Country code must contain only uppercase letters'
});
exports.regionSchema = joi_1.default.string()
    .valid(...constants_1.REGIONS)
    .required()
    .messages({
    'any.only': `Region must be one of: ${constants_1.REGIONS.join(', ')}`
});
exports.countryCodeParamSchema = joi_1.default.object({
    code: exports.countryCodeSchema
});
exports.regionParamSchema = joi_1.default.object({
    region: exports.regionSchema
});
exports.searchQuerySchema = joi_1.default.object({
    name: joi_1.default.string().min(1).max(100),
    capital: joi_1.default.string().min(1).max(100),
    region: joi_1.default.string().valid(...constants_1.REGIONS),
    timezone: joi_1.default.string().min(1).max(50),
    page: joi_1.default.number().integer().min(1).default(1),
    limit: joi_1.default.number().integer().min(1).max(100).default(20)
});
exports.paginationSchema = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1),
    limit: joi_1.default.number().integer().min(1).max(100).default(20)
});
//# sourceMappingURL=validators.js.map
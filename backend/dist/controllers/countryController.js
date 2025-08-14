"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coutryService_1 = __importDefault(require("../services/coutryService"));
const async_1 = require("../middleware/async");
class CountryController {
    constructor() {
        this.getAllCountries = (0, async_1.asyncHandler)(async (req, res) => {
            const query = req.validatedQuery || req.query;
            const { page = 1, limit = 20 } = query;
            const countries = await coutryService_1.default.getAllCountries();
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
        this.getCountryByCode = (0, async_1.asyncHandler)(async (req, res) => {
            const params = req.validatedParams || req.params;
            const { code } = params;
            const country = await coutryService_1.default.getCountryByCode(code);
            res.json({
                success: true,
                data: country
            });
        });
        this.getCountriesByRegion = (0, async_1.asyncHandler)(async (req, res) => {
            const params = req.validatedParams || req.params;
            const query = req.validatedQuery || req.query;
            const { region } = params;
            const { page = 1, limit = 20 } = query;
            const countries = await coutryService_1.default.getCountriesByRegion(region);
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
        this.searchCountries = (0, async_1.asyncHandler)(async (req, res) => {
            const query = (req.validatedQuery || req.query);
            const result = await coutryService_1.default.searchCountries(query);
            res.json({
                success: true,
                data: result.countries,
                pagination: result.pagination
            });
        });
        this.clearCache = (0, async_1.asyncHandler)(async (req, res) => {
            coutryService_1.default.clearCache();
            res.json({
                success: true,
                data: 'Cache cleared successfully'
            });
        });
    }
}
exports.default = new CountryController();
//# sourceMappingURL=countryController.js.map
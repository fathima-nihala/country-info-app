"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const countryController_1 = __importDefault(require("../controllers/countryController"));
const validation_1 = require("../middleware/validation");
const validators_1 = require("../utils/validators");
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
const countryCodeParamsSchema = joi_1.default.object({
    code: validators_1.countryCodeSchema
});
const regionParamsSchema = joi_1.default.object({
    region: validators_1.regionSchema
});
router.get('/', (0, validation_1.validateQuery)(validators_1.paginationSchema), countryController_1.default.getAllCountries);
router.get('/search', (0, validation_1.validateQuery)(validators_1.searchQuerySchema), countryController_1.default.searchCountries);
router.get('/region/:region', (0, validation_1.validateParams)(regionParamsSchema), (0, validation_1.validateQuery)(validators_1.paginationSchema), countryController_1.default.getCountriesByRegion);
router.get('/:code', (0, validation_1.validateParams)(countryCodeParamsSchema), countryController_1.default.getCountryByCode);
router.delete('/cache', countryController_1.default.clearCache);
exports.default = router;
//# sourceMappingURL=countryRoutes.js.map
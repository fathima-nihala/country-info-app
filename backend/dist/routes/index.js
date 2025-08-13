"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const countryRoutes_1 = __importDefault(require("./countryRoutes"));
const router = (0, express_1.Router)();
router.use('/countries', countryRoutes_1.default);
router.get('/health', (req, res) => {
    res.json({
        success: true,
        data: {
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        }
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map
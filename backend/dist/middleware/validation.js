"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateParams = void 0;
const validateParams = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.params);
        if (error) {
            res.status(400).json({
                success: false,
                error: error.details[0].message
            });
            return;
        }
        req.validatedParams = value;
        next();
    };
};
exports.validateParams = validateParams;
const validateQuery = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query);
        if (error) {
            res.status(400).json({
                success: false,
                error: error.details[0].message
            });
            return;
        }
        req.validatedQuery = value;
        next();
    };
};
exports.validateQuery = validateQuery;
//# sourceMappingURL=validation.js.map
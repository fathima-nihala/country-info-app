import { Request, Response } from 'express';
declare class CountryController {
    getAllCountries: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getCountryByCode: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getCountriesByRegion: (req: Request, res: Response, next: import("express").NextFunction) => void;
    searchCountries: (req: Request, res: Response, next: import("express").NextFunction) => void;
    clearCache: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
declare const _default: CountryController;
export default _default;
//# sourceMappingURL=countryController.d.ts.map
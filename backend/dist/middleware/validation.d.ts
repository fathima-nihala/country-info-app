import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { ApiResponse } from '../types';
export declare const validateParams: (schema: ObjectSchema) => (req: Request, res: Response<ApiResponse<any>>, next: NextFunction) => void;
export declare const validateQuery: (schema: ObjectSchema) => (req: Request, res: Response<ApiResponse<any>>, next: NextFunction) => void;
//# sourceMappingURL=validation.d.ts.map
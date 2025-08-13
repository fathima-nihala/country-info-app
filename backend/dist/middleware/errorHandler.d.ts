import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
export interface AppError extends Error {
    statusCode?: number;
}
export declare const errorHandler: (error: AppError, req: Request, res: Response<ApiResponse<any>>, next: NextFunction) => void;
export declare const notFoundHandler: (req: Request, res: Response<ApiResponse<any>>) => void;
//# sourceMappingURL=errorHandler.d.ts.map
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { ApiResponse } from '../types';

export const validateParams = (schema: ObjectSchema) => {
  return (req: Request, res: Response<ApiResponse<any>>, next: NextFunction): void => {
    const { error, value } = schema.validate(req.params);
    
    if (error) {
      res.status(400).json({
        success: false,
        error: error.details[0].message
      });
      return;
    }
    
    req.params = value;
    next();
  };
};

export const validateQuery = (schema: ObjectSchema) => {
  return (req: Request, res: Response<ApiResponse<any>>, next: NextFunction): void => {
    const { error, value } = schema.validate(req.query);
    
    if (error) {
      res.status(400).json({
        success: false,
        error: error.details[0].message
      });
      return;
    }
    
    req.query = value;
    next();
  };
};
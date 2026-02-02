import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { HttpException } from '../utils/http.exception';

export const validationMiddleware = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = (error as any).errors.map((issue: any) => `${issue.path.join('.')} is ${issue.message}`).join(', ');
            next(new HttpException(400, errorMessages));
        } else {
            next(new HttpException(500, 'Internal Server Error'));
        }
    }
};

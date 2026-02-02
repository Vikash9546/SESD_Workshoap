import { Request, Response, NextFunction } from 'express';

export abstract class BaseController {

    protected sendSuccess(res: Response, data: any, message: string = 'Success', statusCode: number = 200): void {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    protected sendError(res: Response, message: string = 'Internal Server Error', statusCode: number = 500): void {
        res.status(statusCode).json({
            success: false,
            message,
        });
    }
}

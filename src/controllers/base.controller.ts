import { Response } from 'express';

export abstract class BaseController {

    protected sendSuccess(res: Response, data: any, message: string = 'Success', statusCode: number = 200): void {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
}

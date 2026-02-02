import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '../utils/http.exception';
import dotenv from 'dotenv';

dotenv.config();

export interface DataStoredInToken {
    id: string;
    email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers['authorization'];
    if (!header) {
        next(new HttpException(401, 'No token provided'));
        return;
    }

    const token = header.split(' ')[1];
    if (!token) {
        next(new HttpException(401, 'Invalid token format'));
        return;
    }

    try {
        const secret = process.env.JWT_SECRET || 'secret';
        const decoded = jwt.verify(token, secret) as DataStoredInToken;
        (req as any).user = decoded;
        next();
    } catch (error) {
        next(new HttpException(401, 'Invalid or expired token'));
    }
};

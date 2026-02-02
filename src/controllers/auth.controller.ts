import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { AuthService } from '../services/auth.service';

export class AuthController extends BaseController {
    private authService: AuthService;

    constructor() {
        super();
        this.authService = new AuthService();
    }

    public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { user, token } = await this.authService.register(req.body);
            this.sendSuccess(res, { user, token }, 'User registered successfully', 201);
        } catch (error) {
            next(error);
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { user, token } = await this.authService.login(req.body);
            this.sendSuccess(res, { user, token }, 'User logged in successfully');
        } catch (error) {
            next(error);
        }
    }
}

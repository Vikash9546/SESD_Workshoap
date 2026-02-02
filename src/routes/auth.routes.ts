import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { registerSchema, loginSchema } from '../dtos/auth.dto';

export class AuthRoutes {
    public router: Router;
    private authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/register', validationMiddleware(registerSchema), this.authController.register);
        this.router.post('/login', validationMiddleware(loginSchema), this.authController.login);
    }
}

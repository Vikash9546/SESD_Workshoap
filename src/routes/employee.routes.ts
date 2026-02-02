import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createEmployeeSchema, updateEmployeeSchema } from '../dtos/employee.dto';

export class EmployeeRoutes {
    public router: Router;
    private employeeController: EmployeeController;

    constructor() {
        this.router = Router();
        this.employeeController = new EmployeeController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', this.employeeController.getAll);
        this.router.get('/:id', this.employeeController.getOne);

        // Protected Routes
        this.router.post('/', authMiddleware, validationMiddleware(createEmployeeSchema), this.employeeController.create);
        this.router.put('/:id', authMiddleware, validationMiddleware(updateEmployeeSchema), this.employeeController.update);
        this.router.delete('/:id', authMiddleware, this.employeeController.delete);
    }
}

import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { validationMiddleware } from '../middlewares/validation.middleware';
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
        this.router.post('/', validationMiddleware(createEmployeeSchema), this.employeeController.create);
        this.router.get('/', this.employeeController.getAll);
        this.router.get('/:id', this.employeeController.getOne);
        this.router.put('/:id', validationMiddleware(updateEmployeeSchema), this.employeeController.update);
        this.router.delete('/:id', this.employeeController.delete);
    }
}

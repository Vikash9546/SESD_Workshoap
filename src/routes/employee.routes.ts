import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';

export class EmployeeRoutes {
    public router: Router;
    private employeeController: EmployeeController;

    constructor() {
        this.router = Router();
        this.employeeController = new EmployeeController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', this.employeeController.create);
        this.router.get('/', this.employeeController.getAll);
        this.router.get('/:id', this.employeeController.getOne);
        this.router.put('/:id', this.employeeController.update);
        this.router.delete('/:id', this.employeeController.delete);
    }
}

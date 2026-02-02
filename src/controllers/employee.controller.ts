import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { EmployeeService } from '../services/employee.service';
import { HttpException } from '../utils/http.exception';

export class EmployeeController extends BaseController {
    private employeeService: EmployeeService;

    constructor() {
        super();
        this.employeeService = new EmployeeService();
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const employee = await this.employeeService.createEmployee(req.body);
            this.sendSuccess(res, employee, 'Employee created successfully', 201);
        } catch (error: any) {
            next(error);
        }
    }

    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.employeeService.getEmployees(req.query);
            this.sendSuccess(res, result);
        } catch (error: any) {
            next(error);
        }
    }

    public getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const employee = await this.employeeService.getEmployeeById(req.params.id as string);
            if (!employee) {
                next(new HttpException(404, 'Employee not found'));
                return;
            }
            this.sendSuccess(res, employee);
        } catch (error: any) {
            next(error);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const employee = await this.employeeService.updateEmployee(req.params.id as string, req.body);
            if (!employee) {
                next(new HttpException(404, 'Employee not found'));
                return;
            }
            this.sendSuccess(res, employee, 'Employee updated successfully');
        } catch (error: any) {
            next(error);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const success = await this.employeeService.deleteEmployee(req.params.id as string);
            if (!success) {
                next(new HttpException(404, 'Employee not found'));
                return;
            }
            this.sendSuccess(res, null, 'Employee deleted successfully');
        } catch (error: any) {
            next(error);
        }
    }
}

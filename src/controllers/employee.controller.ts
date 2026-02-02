import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { EmployeeService } from '../services/employee.service';

export class EmployeeController extends BaseController {
    private employeeService: EmployeeService;

    constructor() {
        super();
        this.employeeService = new EmployeeService();
    }

    public create = async (req: Request, res: Response): Promise<void> => {
        try {
            const employee = await this.employeeService.createEmployee(req.body);
            this.sendSuccess(res, employee, 'Employee created successfully', 201);
        } catch (error: any) {
            this.sendError(res, error.message);
        }
    }

    public getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.employeeService.getEmployees(req.query);
            this.sendSuccess(res, result);
        } catch (error: any) {
            this.sendError(res, error.message);
        }
    }

    public getOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const employee = await this.employeeService.getEmployeeById(req.params.id as string);
            if (!employee) {
                this.sendError(res, 'Employee not found', 404);
                return;
            }
            this.sendSuccess(res, employee);
        } catch (error: any) {
            this.sendError(res, error.message);
        }
    }

    public update = async (req: Request, res: Response): Promise<void> => {
        try {
            const employee = await this.employeeService.updateEmployee(req.params.id as string, req.body);
            if (!employee) {
                this.sendError(res, 'Employee not found', 404);
                return;
            }
            this.sendSuccess(res, employee, 'Employee updated successfully');
        } catch (error: any) {
            this.sendError(res, error.message);
        }
    }

    public delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const success = await this.employeeService.deleteEmployee(req.params.id as string);
            if (!success) {
                this.sendError(res, 'Employee not found', 404);
                return;
            }
            this.sendSuccess(res, null, 'Employee deleted successfully');
        } catch (error: any) {
            this.sendError(res, error.message);
        }
    }
}

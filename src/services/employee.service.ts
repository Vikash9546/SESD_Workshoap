import EmployeeModel from '../models/employee.model';
import { IEmployee } from '../interfaces/employee.interface';

export class EmployeeService {

    public async createEmployee(employeeData: Partial<IEmployee>): Promise<IEmployee> {
        const employee = new EmployeeModel(employeeData);
        return await employee.save();
    }

    public async getEmployees(): Promise<IEmployee[]> {
        return await EmployeeModel.find();
    }

    public async getEmployeeById(id: string): Promise<IEmployee | null> {
        return await EmployeeModel.findById(id);
    }

    public async updateEmployee(id: string, employeeData: Partial<IEmployee>): Promise<IEmployee | null> {
        return await EmployeeModel.findByIdAndUpdate(id, employeeData, { new: true });
    }

    public async deleteEmployee(id: string): Promise<boolean> {
        const result = await EmployeeModel.findByIdAndDelete(id);
        return !!result;
    }
}

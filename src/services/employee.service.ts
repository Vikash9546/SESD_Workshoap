import EmployeeModel from '../models/employee.model';
import { IEmployee } from '../interfaces/employee.interface';

export class EmployeeService {

    public async createEmployee(employeeData: Partial<IEmployee>): Promise<IEmployee> {
        const employee = new EmployeeModel(employeeData);
        return await employee.save();
    }

    public async getEmployees(query: any): Promise<{ employees: IEmployee[], total: number }> {
        const { search, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', ...filters } = query;

        const filterConditions: any = { ...filters };

        // Search logic
        if (search) {
            filterConditions.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { position: { $regex: search, $options: 'i' } },
                { department: { $regex: search, $options: 'i' } },
            ];
        }

        // Pagination logic
        const skip = (Number(page) - 1) * Number(limit);

        // Sorting logic
        const sort: any = {};
        sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

        const employees = await EmployeeModel.find(filterConditions)
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));

        const total = await EmployeeModel.countDocuments(filterConditions);

        return { employees, total };
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

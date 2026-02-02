import { EmployeeRepository } from '../repositories/employee.repository';
import { IEmployee } from '../interfaces/employee.interface';

export class EmployeeService {
    private employeeRepository: EmployeeRepository;

    constructor() {
        this.employeeRepository = new EmployeeRepository();
    }

    public async createEmployee(employeeData: Partial<IEmployee>): Promise<IEmployee> {
        return await this.employeeRepository.create(employeeData);
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

        const employees = await this.employeeRepository.find(filterConditions, sort, skip, Number(limit));
        const total = await this.employeeRepository.count(filterConditions);

        return { employees, total };
    }

    public async getEmployeeById(id: string): Promise<IEmployee | null> {
        return await this.employeeRepository.findOne(id);
    }

    public async updateEmployee(id: string, employeeData: Partial<IEmployee>): Promise<IEmployee | null> {
        return await this.employeeRepository.update(id, employeeData);
    }

    public async deleteEmployee(id: string): Promise<boolean> {
        return await this.employeeRepository.delete(id);
    }
}

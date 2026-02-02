import { BaseRepository } from './base.repository';
import EmployeeModel from '../models/employee.model';
import { IEmployee } from '../interfaces/employee.interface';

export class EmployeeRepository extends BaseRepository<IEmployee> {
    constructor() {
        super(EmployeeModel);
    }
}

import { z } from 'zod';

export const createEmployeeSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    position: z.string().min(1, 'Position is required'),
    department: z.string().min(1, 'Department is required'),
    salary: z.number().min(0, 'Salary must be a positive number'),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

import { Document } from 'mongoose';

export interface IEmployee extends Document {
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    department: string;
    salary: number;
    dateHired: Date;
}

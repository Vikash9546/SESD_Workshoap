import mongoose, { Schema } from 'mongoose';
import { IEmployee } from '../interfaces/employee.interface';

const EmployeeSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true },
    dateHired: { type: Date, default: Date.now },
}, {
    timestamps: true
});

export default mongoose.model<IEmployee>('Employee', EmployeeSchema);

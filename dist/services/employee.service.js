"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const employee_model_1 = __importDefault(require("../models/employee.model"));
class EmployeeService {
    createEmployee(employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = new employee_model_1.default(employeeData);
            return yield employee.save();
        });
    }
    getEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield employee_model_1.default.find();
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield employee_model_1.default.findById(id);
        });
    }
    updateEmployee(id, employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield employee_model_1.default.findByIdAndUpdate(id, employeeData, { new: true });
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield employee_model_1.default.findByIdAndDelete(id);
            return !!result;
        });
    }
}
exports.EmployeeService = EmployeeService;

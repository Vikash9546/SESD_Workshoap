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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
    getEmployees(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = query, filters = __rest(query, ["search", "page", "limit", "sortBy", "sortOrder"]);
            const filterConditions = Object.assign({}, filters);
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
            const sort = {};
            sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
            const employees = yield employee_model_1.default.find(filterConditions)
                .sort(sort)
                .skip(skip)
                .limit(Number(limit));
            const total = yield employee_model_1.default.countDocuments(filterConditions);
            return { employees, total };
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

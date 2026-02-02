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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const employee_repository_1 = require("../repositories/employee.repository");
class EmployeeService {
    constructor() {
        this.employeeRepository = new employee_repository_1.EmployeeRepository();
    }
    createEmployee(employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employeeRepository.create(employeeData);
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
            const employees = yield this.employeeRepository.find(filterConditions, sort, skip, Number(limit));
            const total = yield this.employeeRepository.count(filterConditions);
            return { employees, total };
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employeeRepository.findOne(id);
        });
    }
    updateEmployee(id, employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employeeRepository.update(id, employeeData);
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.employeeRepository.delete(id);
        });
    }
}
exports.EmployeeService = EmployeeService;

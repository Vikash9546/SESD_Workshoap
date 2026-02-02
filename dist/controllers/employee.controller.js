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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const base_controller_1 = require("./base.controller");
const employee_service_1 = require("../services/employee.service");
const http_exception_1 = require("../utils/http.exception");
class EmployeeController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield this.employeeService.createEmployee(req.body);
                this.sendSuccess(res, employee, 'Employee created successfully', 201);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.employeeService.getEmployees(req.query);
                this.sendSuccess(res, result);
            }
            catch (error) {
                next(error);
            }
        });
        this.getOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield this.employeeService.getEmployeeById(req.params.id);
                if (!employee) {
                    next(new http_exception_1.HttpException(404, 'Employee not found'));
                    return;
                }
                this.sendSuccess(res, employee);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield this.employeeService.updateEmployee(req.params.id, req.body);
                if (!employee) {
                    next(new http_exception_1.HttpException(404, 'Employee not found'));
                    return;
                }
                this.sendSuccess(res, employee, 'Employee updated successfully');
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.employeeService.deleteEmployee(req.params.id);
                if (!success) {
                    next(new http_exception_1.HttpException(404, 'Employee not found'));
                    return;
                }
                this.sendSuccess(res, null, 'Employee deleted successfully');
            }
            catch (error) {
                next(error);
            }
        });
        this.employeeService = new employee_service_1.EmployeeService();
    }
}
exports.EmployeeController = EmployeeController;

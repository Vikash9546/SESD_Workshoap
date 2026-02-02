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
class EmployeeController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield this.employeeService.createEmployee(req.body);
                this.sendSuccess(res, employee, 'Employee created successfully', 201);
            }
            catch (error) {
                this.sendError(res, error.message);
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.employeeService.getEmployees(req.query);
                this.sendSuccess(res, result);
            }
            catch (error) {
                this.sendError(res, error.message);
            }
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield this.employeeService.getEmployeeById(req.params.id);
                if (!employee) {
                    this.sendError(res, 'Employee not found', 404);
                    return;
                }
                this.sendSuccess(res, employee);
            }
            catch (error) {
                this.sendError(res, error.message);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield this.employeeService.updateEmployee(req.params.id, req.body);
                if (!employee) {
                    this.sendError(res, 'Employee not found', 404);
                    return;
                }
                this.sendSuccess(res, employee, 'Employee updated successfully');
            }
            catch (error) {
                this.sendError(res, error.message);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.employeeService.deleteEmployee(req.params.id);
                if (!success) {
                    this.sendError(res, 'Employee not found', 404);
                    return;
                }
                this.sendSuccess(res, null, 'Employee deleted successfully');
            }
            catch (error) {
                this.sendError(res, error.message);
            }
        });
        this.employeeService = new employee_service_1.EmployeeService();
    }
}
exports.EmployeeController = EmployeeController;

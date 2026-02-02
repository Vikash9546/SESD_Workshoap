"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRoutes = void 0;
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
class EmployeeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.employeeController = new employee_controller_1.EmployeeController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/', this.employeeController.create);
        this.router.get('/', this.employeeController.getAll);
        this.router.get('/:id', this.employeeController.getOne);
        this.router.put('/:id', this.employeeController.update);
        this.router.delete('/:id', this.employeeController.delete);
    }
}
exports.EmployeeRoutes = EmployeeRoutes;

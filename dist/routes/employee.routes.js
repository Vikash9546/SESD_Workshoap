"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRoutes = void 0;
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const employee_dto_1 = require("../dtos/employee.dto");
class EmployeeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.employeeController = new employee_controller_1.EmployeeController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', this.employeeController.getAll);
        this.router.get('/:id', this.employeeController.getOne);
        // Protected Routes
        this.router.post('/', auth_middleware_1.authMiddleware, (0, validation_middleware_1.validationMiddleware)(employee_dto_1.createEmployeeSchema), this.employeeController.create);
        this.router.put('/:id', auth_middleware_1.authMiddleware, (0, validation_middleware_1.validationMiddleware)(employee_dto_1.updateEmployeeSchema), this.employeeController.update);
        this.router.delete('/:id', auth_middleware_1.authMiddleware, this.employeeController.delete);
    }
}
exports.EmployeeRoutes = EmployeeRoutes;

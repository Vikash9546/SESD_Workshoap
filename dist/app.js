"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const employee_routes_1 = require("./routes/employee.routes");
const auth_routes_1 = require("./routes/auth.routes");
const error_middleware_1 = require("./middlewares/error.middleware");
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.connectToDatabase();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    connectToDatabase() {
        const db = database_1.Database.getInstance();
        db.connect();
    }
    initializeMiddleware() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initializeRoutes() {
        const employeeRoutes = new employee_routes_1.EmployeeRoutes();
        const authRoutes = new auth_routes_1.AuthRoutes();
        this.app.use('/api/employees', employeeRoutes.router);
        this.app.use('/api/auth', authRoutes.router);
        // Base route for health check
        this.app.get('/', (req, res) => {
            res.send('Employee Management System API is running.');
        });
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.errorMiddleware);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });
    }
}
exports.App = App;

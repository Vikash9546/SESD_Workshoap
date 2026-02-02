import express, { Application } from 'express';
import cors from 'cors';
import { Database } from './config/database';
import { EmployeeRoutes } from './routes/employee.routes';

export class App {
    public app: Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.connectToDatabase();
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    private connectToDatabase(): void {
        const db = Database.getInstance();
        db.connect();
    }

    private initializeMiddleware(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(): void {
        const employeeRoutes = new EmployeeRoutes();
        this.app.use('/api/employees', employeeRoutes.router);

        // Base route for health check
        this.app.get('/', (req, res) => {
            res.send('Employee Management System API is running.');
        });
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });
    }
}

import express, { Application } from 'express';
import cors from 'cors';
import { Database } from './config/database';
import { EmployeeRoutes } from './routes/employee.routes';
import { AuthRoutes } from './routes/auth.routes';
import { errorMiddleware } from './middlewares/error.middleware';

export class App {
    public app: Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.connectToDatabase();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandling();
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
        const authRoutes = new AuthRoutes();

        this.app.use('/api/employees', employeeRoutes.router);
        this.app.use('/api/auth', authRoutes.router);

        // Base route for health check
        this.app.get('/', (req, res) => {
            res.send('Employee Management System API is running.');
        });
    }

    private initializeErrorHandling(): void {
        this.app.use(errorMiddleware);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });
    }
}

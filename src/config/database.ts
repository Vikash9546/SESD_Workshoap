import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export class Database {
    private static instance: Database;
    private readonly MONGO_URI: string;

    private constructor() {
        this.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ems_db';
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(this.MONGO_URI);
            console.log('Successfully connected to MongoDB.');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    }
}

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { IUser } from '../models/user.model';
import { HttpException } from '../utils/http.exception';
import dotenv from 'dotenv';

dotenv.config();

export class AuthService {
    private userRepository: UserRepository;
    private JWT_SECRET: string;

    constructor() {
        this.userRepository = new UserRepository();
        this.JWT_SECRET = process.env.JWT_SECRET || 'secret';
    }

    public async register(userData: Partial<IUser>): Promise<{ user: IUser, token: string }> {
        if (!userData.email || !userData.password) throw new HttpException(400, 'Email and password are required');

        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) throw new HttpException(400, 'User already exists');

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await this.userRepository.create({ ...userData, password: hashedPassword });

        const token = this.createToken(user);
        return { user, token };
    }

    public async login(userData: Partial<IUser>): Promise<{ user: IUser, token: string }> {
        if (!userData.email || !userData.password) throw new HttpException(400, 'Email and password are required');

        const user = await this.userRepository.findByEmail(userData.email);
        if (!user) throw new HttpException(401, 'Invalid credentials');

        const isMatch = await bcrypt.compare(userData.password, user.password);
        if (!isMatch) throw new HttpException(401, 'Invalid credentials');

        const token = this.createToken(user);
        return { user, token };
    }

    private createToken(user: IUser): string {
        return jwt.sign({ id: user._id, email: user.email }, this.JWT_SECRET, { expiresIn: '1h' });
    }
}

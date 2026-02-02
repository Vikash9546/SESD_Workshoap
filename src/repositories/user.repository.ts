import { BaseRepository } from './base.repository';
import UserModel, { IUser } from '../models/user.model';

export class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email }).exec();
    }
}

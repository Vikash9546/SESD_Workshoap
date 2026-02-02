import { Model, Document, UpdateQuery } from 'mongoose';
import { IRead, IWrite } from '../interfaces/crud.interface';

export abstract class BaseRepository<T extends Document> implements IRead<T>, IWrite<T> {
    private _model: Model<T>;

    constructor(schemaModel: Model<T>) {
        this._model = schemaModel;
    }

    async create(item: Partial<T>): Promise<T> {
        return await this._model.create(item);
    }

    async find(item: any = {}, sort: any = {}, skip: number = 0, limit: number = 10): Promise<T[]> {
        return await this._model.find(item).sort(sort).skip(skip).limit(limit).exec();
    }

    async findOne(id: string): Promise<T | null> {
        return await this._model.findById(id).exec();
    }

    async update(id: string, item: UpdateQuery<T>): Promise<T | null> {
        return await this._model.findByIdAndUpdate(id, item, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this._model.findByIdAndDelete(id).exec();
        return !!result;
    }

    async count(filter: any = {}): Promise<number> {
        return await this._model.countDocuments(filter).exec();
    }
}

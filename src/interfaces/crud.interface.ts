export interface IRead<T> {
    find(item: T): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
}

export interface IWrite<T> {
    create(item: T): Promise<T>;
    update(id: string, item: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}

export interface IBaseRepository<T> extends IRead<T>, IWrite<T> { }

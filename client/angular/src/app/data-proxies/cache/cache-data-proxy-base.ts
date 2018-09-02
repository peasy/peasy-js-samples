import { Entity, IDataProxy } from '../../contracts';

export abstract class CacheDataProxy<T extends Entity> implements IDataProxy<T> {

  protected _data: Map<string, T> = new Map<string, T>();

  constructor(protected dataProxy: IDataProxy<T>) {
  }

  public async getAll(): Promise<T[]> {
    const results = Array.from(this._data.values(), i => {
      return Object.assign({}, i);
    });

    if (results.length) { return results; }

    const result = await this.dataProxy.getAll();
    this.insertBulk(result);
    return result;
  }

  public insertBulk(data: T[]) {
    data.forEach(i => this._data.set(i.id, Object.assign({}, i)));
  }

  public async getById(id: string): Promise<T> {
    const data = this._data.get(id);
    if (data) { return Object.assign({}, data); }

    const result = await this.dataProxy.getById(id);
    if (result) {
      this.insertBulk([result]);
      return result;
    }
    return null;
  }

  public async insert(data: T): Promise<T> {
    const result = await this.dataProxy.insert(data);
    this._data.set(data.id, Object.assign({}, data));
    // this.eventAggregator.insert.publish(data);
    return result;
  }

  public async update(data: T): Promise<T> {
    const result = await this.dataProxy.update(data);
    this._data.set(data.id, Object.assign({}, data));
    // this.eventAggregator.update.publish(data);
    return result;
  }

  public async destroy(id: string): Promise<void> {
    const result = await this.dataProxy.destroy(id);
    const data = this._data.get(id);
    this._data.delete(id);
    // this.eventAggregator.delete.publish(data);
  }
}


import { Entity, IDataProxy } from '../../contracts';
import { EventAggregator } from '../../event-aggregators/event-aggregator';

export abstract class CacheDataProxy<T extends Entity> implements IDataProxy<T> {

  protected _data: Map<string, T> = new Map<string, T>();

  constructor(protected dataProxy: IDataProxy<T>, protected eventAggregator: EventAggregator<T>) {

    eventAggregator.remoteUpdate.subscribe(async data => {
      console.log('remote update', data);
      await this.getAll(); // force initialization of data
      this._data.set(data.id, Object.assign({}, data));
      this.eventAggregator.update.publish(data);
    });

    eventAggregator.remoteInsert.subscribe(async data => {
      console.log('remote insert', data);
      await this.getAll(); // force initialization of data
      this._data.set(data.id, Object.assign({}, data));
      this.eventAggregator.insert.publish(data);
    });

    eventAggregator.remoteDelete.subscribe(async data => {
      console.log('remote delete', data);
      await this.getAll(); // force initialization of data
      const item = this._data.get(data.id);
      if (item) {
        this._data.delete(item.id);
        this.eventAggregator.delete.publish(item);
      }
    });
  }

  public async getAll(): Promise<T[]> {
    const results = Array.from(this._data.values(), i => {
      return Object.assign({}, i);
    });
    console.log('getall results', results);
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
    this._data.set(result.id, Object.assign({}, result));
    this.eventAggregator.insert.publish(Object.assign({}, result));
    return result;
  }

  public async update(data: T): Promise<T> {
    const result = await this.dataProxy.update(data);
    this._data.set(result.id, Object.assign({}, result));
    this.eventAggregator.update.publish(Object.assign({}, result));
    return result;
  }

  public async destroy(id: string): Promise<void> {
    await this.dataProxy.destroy(id);
    const data = this._data.get(id);
    if (data) {
      this._data.delete(id);
      this.eventAggregator.delete.publish(data);
    }
  }
}


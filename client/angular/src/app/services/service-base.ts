import { ExecutionResult, Entity } from '../contracts';
import { Store } from '../stores/store';

export class ServiceBase<T extends Entity> {

  constructor(protected store: Store<T>, protected service) {
  }

  public async getAll(): Promise<ExecutionResult<T[]>> {
    const data = this.store.getAll();
    if (!data.length) {
      const result = await this.handle<T[]>(this.service.getAllCommand());
      this.store.insertBulk(result.value);
      return result;
    }
    return {
      success: true,
      value: data,
      errors: []
    } as ExecutionResult<T[]>;
  }

  public async getById(id: string): Promise<ExecutionResult<T>> {
    const data = this.store.getById(id);
    if (!data) {
      const foo = await this.handle<T>(this.service.getByIdCommand(id));
      if (foo.value) {
        this.store.insertBulk([foo.value]);
        return foo;
      }
    }
    return {
      success: true,
      value: data,
      errors: []
    } as ExecutionResult<T>;
  }

  public async update(entity: T): Promise<ExecutionResult<T>> {
    const result = await this.handle<T>(this.service.updateCommand(entity));
    this.store.update(result.value);
    return result;
  }

  public async insert(entity: T): Promise<ExecutionResult<T>> {
    const result = await this.handle<T>(this.service.insertCommand(entity));
    this.store.insert(result.value);
    return result;
  }

  public async destroy(id: string): Promise<ExecutionResult<T>> {
    const result = this.handle<T>(this.service.destroyCommand(id));
    this.store.destroy(id);
    return result;
  }

  protected handle<P>(command): Promise<ExecutionResult<P>> {
    return new Promise((resolve, reject) => {
      command.execute((err, result) => {
        if (err) {
          return reject(err);
        }
        if (!result.success) {
          return reject(result.errors);
        }
        return resolve(result);
      });
    });
  }
}

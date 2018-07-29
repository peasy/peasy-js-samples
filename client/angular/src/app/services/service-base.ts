import { ExecutionResult } from '../contracts';

export class ServiceBase<T> {

  constructor(protected service) {
  }

  getAll(): Promise<ExecutionResult<T[]>> {
    return this.handle(this.service.getAllCommand());
  }

  getById(id: string): Promise<ExecutionResult<T>> {
    return this.handle(this.service.getByIdCommand(id));
  }

  update(entity: T): Promise<ExecutionResult<T>> {
    return this.handle(this.service.updateCommand(entity));
  }

  insert(entity: T): Promise<ExecutionResult<T>> {
    return this.handle(this.service.insertCommand(entity));
  }

  destroy(id: string): Promise<ExecutionResult<T>> {
    return this.handle(this.service.destroyCommand(id));
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

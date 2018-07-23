
export interface Error {
  association: string;
  message: string;
}

export interface ExecutionResult<T> {
  success: boolean;
  errors: Error[];
  value: T;
}

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

  private handle<P>(command): Promise<ExecutionResult<P>> {
    return new Promise((resolve, reject) => {
      command.execute((err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
}

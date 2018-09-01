import { ExecutionResult, Entity, IDataProxy } from '../contracts';
import { Store } from '../stores/store';
import { BusinessService, Command, Rule } from 'peasy-js';
import { CommandBase } from '../data-proxies/http/event-emitter';

export abstract class ServiceBase<T extends Entity> extends BusinessService {

  constructor(protected dataProxy: IDataProxy<T>) {
    super(dataProxy);
  }

  public getAllCommand(): CommandBase<T[]> {
    return super.getAllCommand() as CommandBase<T[]>;
  }

  public getByIdCommand(id: string): CommandBase<T> {
    return super.getByIdCommand(id) as CommandBase<T>;
  }

  public insertCommand(data: T): CommandBase<T> {
    return super.insertCommand(data) as CommandBase<T>;
  }

  public updateCommand(data: T): CommandBase<T> {
    return super.updateCommand(data) as CommandBase<T>;
  }

  public destroyCommand(id: string): CommandBase<void> {
    return super.destroyCommand(id) as Command<void>;
  }
}

// export class ServiceBase<T extends Entity> {

//   constructor(protected store: Store<T>, protected service) {
//   }

//   public async getAll(): Promise<ExecutionResult<T[]>> {
//     const data = this.store.getAll();
//     if (!data.length) {
//       const result = await this.handle<T[]>(this.service.getAllCommand());
//       this.store.insertBulk(result.value);
//       return result;
//     }
//     return {
//       success: true,
//       value: data,
//       errors: []
//     } as ExecutionResult<T[]>;
//   }

//   public async getById(id: string): Promise<ExecutionResult<T>> {
//     const data = this.store.getById(id);
//     if (!data) {
//       const foo = await this.handle<T>(this.service.getByIdCommand(id));
//       if (foo.value) {
//         this.store.insertBulk([foo.value]);
//         return foo;
//       }
//     }
//     return {
//       success: true,
//       value: data,
//       errors: []
//     } as ExecutionResult<T>;
//   }

//   public async update(entity: T): Promise<ExecutionResult<T>> {
//     const result = await this.handle<T>(this.service.updateCommand(entity));
//     this.store.update(result.value);
//     return result;
//   }

//   public async insert(entity: T): Promise<ExecutionResult<T>> {
//     const result = await this.handle<T>(this.service.insertCommand(entity));
//     this.store.insert(result.value);
//     return result;
//   }

//   public async destroy(id: string): Promise<ExecutionResult<T>> {
//     const result = this.handle<T>(this.service.destroyCommand(id));
//     this.store.destroy(id);
//     return result;
//   }

//   protected handle<P>(command): Promise<ExecutionResult<P>> {
//     return new Promise((resolve, reject) => {
//       command.execute((err, result) => {
//         if (err) {
//           return reject(err);
//         }
//         if (!result.success) {
//           return reject(result.errors);
//         }
//         return resolve(result);
//       });
//     });
//   }
// }

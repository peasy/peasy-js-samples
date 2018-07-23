import { Injectable } from '@angular/core';
import { Customer } from '../customer';
import ordersDotCom from '../../../../businessLogic.js';
import { Entity } from '../customer/customer-detail/customer-detail-viewmodel';

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

  update(entity: Entity): Promise<ExecutionResult<T>> {
    return this.handle(this.service.updateCommand(entity));
  }

  insert(entity: Entity): Promise<ExecutionResult<T>> {
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

@Injectable({
  providedIn: 'root'
}) export class CustomerService extends ServiceBase<Customer> {

  constructor() {
    super(ordersDotCom.services.customerService);
   }

}

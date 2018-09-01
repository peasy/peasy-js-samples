import { Entity, OrderItem, Order, Customer, ExecutionResult, Category, InventoryItem, Product } from '../../contracts';
import { BusinessService, Command, Rule } from 'peasy-js';
import { Injectable } from '@angular/core';
import axios from 'axios';

export class CommandArgs {
  _onInitialization?: any;
  _getRules?: any;
  _onValidationSuccess?: any;
}

export class ServiceCommand<T> extends Command {

  constructor(functions: CommandArgs) {
    super(functions);
  }

  public execute(): Promise<ExecutionResult<T>> {
    return super.execute();
  }

}


export abstract class CommandBase<T> extends Command {

  public execute(): Promise<ExecutionResult<T>> {
    return super.execute();
  }

  protected _onInitialization(): Promise<void> {
    return Promise.resolve();
  }

  protected _getRules(): Promise<Rule[]> {
    return Promise.resolve([]);
  }

  protected _onValidationSuccess(): Promise<void> {
    return Promise.resolve();
  }
}

export abstract class ServiceBase<T extends Entity> extends BusinessService {

  constructor(protected dataProxy: IDataProxy<T>) {
    super(dataProxy);
  }

  getByIdCommand(id: string) {
    return super.getByIdCommand(id);
  }

}

export interface IDataProxy<T extends Entity> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  insert(data: T): Promise<T>;
  update(data: T):  Promise<T>;
  destroy(id: string): Promise<void>;
}

export abstract class HttpDataProxy<T extends Entity> implements IDataProxy<T> {

  protected abstract baseUri: string;

  getAll(): Promise<T[]> {
    return axios.get(this.baseUri).then(result => result.data);
  }

  getById(id: string): Promise<T> {
    return axios.get(`${this.baseUri}/${id}`).then(result => result.data);
  }

  insert(data: T): Promise<T> {
    return axios.post(this.baseUri, data).then(result => result.data);
  }

  update(data: T): Promise<T> {
    return axios.put(`${this.baseUri}/${data.id}`, data).then(result => result.data);
  }

  destroy(id: string): Promise<void> {
    return axios.delete(`${this.baseUri}/${id}`).then(result => result.data);
  }
}


@Injectable({ providedIn: 'root' })
export class CustomerDataProxy extends HttpDataProxy<Customer> {
  protected baseUri = '/customers';
}

@Injectable({ providedIn: 'root' })
export class CategoryDataProxy extends HttpDataProxy<Category> {
  protected baseUri = '/categories';
}

@Injectable({ providedIn: 'root' })
export class InventoryDataProxy extends HttpDataProxy<InventoryItem> {
  protected baseUri = '/inventoryitems';
}

@Injectable({ providedIn: 'root' })
export class ProductDataProxy extends HttpDataProxy<Product> {
  protected baseUri = '/products';
}

@Injectable({ providedIn: 'root' })
export class OrderDataProxy extends HttpDataProxy<Order> {
  protected baseUri = '/orders';
}

@Injectable({ providedIn: 'root' })
export class OrderItemDataProxy extends HttpDataProxy<OrderItem> {
  protected baseUri = '/orderitems';
}


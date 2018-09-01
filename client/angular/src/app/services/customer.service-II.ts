import { Injectable } from '@angular/core';
import { Customer, Entity } from '../contracts';
import { BusinessService, Command, Rule } from 'peasy-js';
import { IDataProxy, CommandBase } from '../data-proxies/http/event-emitter';

export abstract class ServiceBaseII<T extends Entity> extends BusinessService {

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

export class InsertCustomerCommand extends CommandBase<Customer> {

  constructor(private customer: Customer) {
    super();
  }

  // protected _getRules() {
  //   return Promise.resolve([new NameRule(this.customer.name)]);
  // }

}

export class NameRule extends Rule {

  constructor(private name: string) {
    super();
  }

  protected _onValidate(): Promise<void> {
    if (this.name === 'aaron han') {
      super._invalidate('Name cannot be aaron han');
    }
    return Promise.resolve();
  }
}


import { Entity, OrderItem, Order, Customer, ExecutionResult, Category, InventoryItem, Product } from '../../contracts';
import { BusinessService, Command, Rule } from 'peasy-js';
import { Injectable } from '@angular/core';
import axios from 'axios';

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

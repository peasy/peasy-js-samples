import { Injectable } from '@angular/core';
import { Customer } from '../contracts';
import { BusinessService, IRule } from 'peasy-js';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';
import { stripAllFieldsFrom } from '../../../../../business_logic/shared/utils';
import { FieldRequiredRule } from '../rules/fieldRequiredRule';
import { FieldLengthRule } from '../rules/fieldLengthRule';
import { CanDeleteCustomerRule } from '../rules/canDeleteCustomerRule';
import { OrderService } from './order.service';

@Injectable({ providedIn: 'root' })
export class CustomerService extends BusinessService<Customer, string> {

  constructor(proxyFactory: DataProxyFactory, private orderService: OrderService) {
    super(proxyFactory.customerDataProxy);
  }

  _onInsertCommandInitialization(customer: Customer, context: Object): Promise<void> {
    stripAllFieldsFrom(customer).except(['name']);
    return Promise.resolve();
  }

  _getRulesForInsertCommand(customer: Customer, context: Object): Promise<IRule[]> {
    return Promise.resolve([
      new FieldRequiredRule('name', customer)
        .ifValidThenValidate(new FieldLengthRule('name', customer.name, 50))
    ]);
  }

  _onUpdateCommandInitialization(customer: Customer, context: Object): Promise<void> {
    stripAllFieldsFrom(customer).except(['id', 'name']);
    return Promise.resolve();
  }

  _getRulesForUpdateCommand(customer: Customer, context: Object): Promise<IRule[]> {
    return Promise.resolve([
      new FieldRequiredRule('id', customer),
      new FieldLengthRule('name', customer.name, 50)
    ]);
  }

  _getRulesForDestroyCommand(id: string, context: Object): Promise<IRule[]> {
    return Promise.resolve([
      new CanDeleteCustomerRule(id, this.orderService)
    ]);
  }
}

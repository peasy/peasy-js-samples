import { Injectable } from '@angular/core';
import { Customer } from '../contracts';
import { CustomerDataProxy } from '../data-proxies/http/customer-data-proxy';
import { ServiceBase } from './service-base';

@Injectable({ providedIn: 'root' })
export class CustomerService extends ServiceBase<Customer> {

  constructor(dataProxy: CustomerDataProxy) {
    super(dataProxy);
  }

  // protected _onInsertCommandInitialization(context): Promise<void> {
  //   return Promise.resolve();
  // }

  // protected _getRulesForInsertCommand(context): Promise<Rule[]> {
  //   const customer = this['data'];
  //   return Promise.resolve([new NameRule(customer.name)]);
  // }

  // protected _onUpdateCommandValidationSuccess(data: Customer): Promise<Customer> {
  //   debugger;
  //   return Promise.resolve({
  //     id: '132', name: data.name
  //   } as Customer);
  // }

  // public insertCommand(data: Customer): Command<Customer> {
  //   return new InsertCustomerCommand(data);
  // }

  // public updateCommand(data: Customer): Command<Customer> {
  //   return new ServiceCommand<Customer>({
  //     _onValidationSuccess: function(context: any) {
  //       return Promise.resolve({
  //         id: 1324, name: data.name
  //       });
  //     }
  //   });
  // }
}

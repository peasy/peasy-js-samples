import { Injectable } from '@angular/core';
import { Customer } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';
import { Store, CustomerStore } from '../app.store';

@Injectable({ providedIn: 'root' })
export class CustomerService extends ServiceBase<Customer> {

  constructor(store: CustomerStore) {
    super(store, ordersDotCom.services.customerService);
  }

}

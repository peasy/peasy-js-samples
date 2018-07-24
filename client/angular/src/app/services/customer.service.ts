import { Injectable } from '@angular/core';
import { Customer } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';

@Injectable({ providedIn: 'root' })
export class CustomerService extends ServiceBase<Customer> {

  constructor() {
    super(ordersDotCom.services.customerService);
  }

}

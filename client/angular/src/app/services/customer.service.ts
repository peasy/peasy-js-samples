import { Injectable } from '@angular/core';
import { Customer } from '../customer';
import { Customers } from '../customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getAll(): Promise<Customer[]> {
    return Promise.resolve(Customers);
  }
}

import { Injectable } from '@angular/core';
import { HttpDataProxy } from './http-data-proxy-base';
import { Customer } from '../../contracts';

@Injectable({ providedIn: 'root' })
export class CustomerDataProxy extends HttpDataProxy<Customer> {
  protected baseUri = '/customers';
}

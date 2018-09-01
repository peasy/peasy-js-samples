import { Injectable } from '@angular/core';
import { HttpDataProxy } from './http-data-proxy-base';
import { Order } from '../../contracts';

@Injectable({ providedIn: 'root' })
export class OrderDataProxy extends HttpDataProxy<Order> {
  protected baseUri = '/orders';
}

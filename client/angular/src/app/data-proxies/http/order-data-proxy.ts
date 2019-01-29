import { Injectable } from '@angular/core';
import { HttpDataProxy } from './http-data-proxy-base';
import { Order, IOrderDataProxy } from '../../contracts';

@Injectable({ providedIn: 'root' })
export class OrderDataProxy extends HttpDataProxy<Order> implements IOrderDataProxy {
  protected baseUri = '/orders';

  public getByCustomer(customerId: string): Promise<Order[]> {
    return this.getAllById(`${this.baseUri}?customerid=${customerId}`);
  }
}

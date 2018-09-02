import { Injectable } from '@angular/core';
import { HttpDataProxy } from './http-data-proxy-base';
import { OrderItem, IOrderItemDataProxy } from '../../contracts';
import axios from 'axios';

@Injectable({ providedIn: 'root' })
export class OrderItemDataProxy
  extends HttpDataProxy<OrderItem>
  implements IOrderItemDataProxy {

  protected baseUri = '/orderitems';

  getByOrder(orderId: string): Promise<OrderItem[]> {
    return axios.get(`${this.baseUri}?orderid=${orderId}`)
      .then(result => result.data)
      .catch(e => {
        if (e.response.status === 404) {
          return Promise.resolve([]);
        }
        return Promise.reject(e);
      });
  }
}


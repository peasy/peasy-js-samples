import { Injectable } from '@angular/core';
import { OrderItem, IOrderItemDataProxy } from '../../contracts';
import { CacheDataProxy } from './cache-data-proxy-base';

@Injectable({ providedIn: 'root' })
export class OrderItemCacheDataProxy
  extends CacheDataProxy<OrderItem>
  implements IOrderItemDataProxy {

  constructor(protected dataProxy: IOrderItemDataProxy) {
    super(dataProxy);
  }

  getByOrder(orderId: string): Promise<OrderItem[]> {
    return this.dataProxy.getByOrder(orderId);
  }

}

import { Injectable } from '@angular/core';
import { OrderItem, IOrderItemDataProxy } from '../../contracts';
import { CacheDataProxy } from './cache-data-proxy-base';
import { OrderItemEventAggregator } from '../../event-aggregators/order-item-event-aggregator';

@Injectable({ providedIn: 'root' })
export class OrderItemCacheDataProxy
  extends CacheDataProxy<OrderItem>
  implements IOrderItemDataProxy {

  constructor(protected dataProxy: IOrderItemDataProxy, protected eventAggregator: OrderItemEventAggregator) {
    super(dataProxy, eventAggregator);
  }

  getByOrder(orderId: string): Promise<OrderItem[]> {
    return this.dataProxy.getByOrder(orderId);
  }

}

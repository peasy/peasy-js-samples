import { Injectable } from '@angular/core';
import { IOrderDataProxy, Order } from '../../contracts';
import { CacheDataProxy } from './cache-data-proxy-base';
import { OrderEventAggregator } from '../../event-aggregators/order-event-aggregator';

@Injectable({ providedIn: 'root' })
export class OrderCacheDataProxy
  extends CacheDataProxy<Order>
  implements IOrderDataProxy {

  constructor(protected dataProxy: IOrderDataProxy, protected eventAggregator: OrderEventAggregator) {
    super(dataProxy, eventAggregator);
  }

}

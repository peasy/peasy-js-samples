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

  public getByOrder(orderId: string): Promise<OrderItem[]> {
    return this.dataProxy.getByOrder(orderId);
  }

  public async submit(itemId: string): Promise<OrderItem> {
    const result = await this.dataProxy.submit(itemId);
    this._data.set(result.id, Object.assign({}, result));
    this.eventAggregator.update.publish(result);
    return result;
  }

  public async ship(itemId: string): Promise<OrderItem> {
    const result = await this.dataProxy.ship(itemId);
    this._data.set(result.id, Object.assign({}, result));
    this.eventAggregator.update.publish(result);
    return result;
  }
}

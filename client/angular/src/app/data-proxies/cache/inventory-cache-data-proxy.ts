import { Injectable } from '@angular/core';
import { InventoryItem, IInventoryDataProxy, OrderItem } from '../../contracts';
import { CacheDataProxy } from './cache-data-proxy-base';
import { InventoryEventAggregator } from '../../event-aggregators/inventory-event-aggregator';
import { OrderItemEventAggregator } from '../../event-aggregators/order-item-event-aggregator';

@Injectable({ providedIn: 'root' })
export class InventoryCacheDataProxy
  extends CacheDataProxy<InventoryItem>
  implements IInventoryDataProxy {

  constructor(
    protected dataProxy: IInventoryDataProxy,
    protected eventAggregator: InventoryEventAggregator,
    protected orderItemEventAggregator: OrderItemEventAggregator) {
      super(dataProxy, eventAggregator);
      this.orderItemEventAggregator.update.subscribe(this.handleOrderItemUpdate.bind(this));
  }

  private async handleOrderItemUpdate(orderItem: OrderItem) {
    this.getByProduct(orderItem.productId);
  }

  public async getByProduct(productId: string): Promise<InventoryItem> {
    const result = await this.dataProxy.getByProduct(productId);
    this._data.set(result.id, Object.assign({}, result));
    return result;
  }
}

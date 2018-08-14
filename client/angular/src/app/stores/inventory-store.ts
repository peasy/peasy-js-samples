import { Injectable } from '@angular/core';
import { Store } from './store';
import { OrderItemEventAggregator } from '../event-aggregators/order-item-event-aggregator';
import { InventoryItem, OrderItem } from '../contracts';
import { InventoryEventAggregator } from '../event-aggregators/inventory-event-aggregator';

@Injectable({ providedIn: 'root' })
export class InventoryStore extends Store<InventoryItem> {

  constructor(
    protected eventAggregator: InventoryEventAggregator,
    protected orderItemEventAggregator: OrderItemEventAggregator) {
      super(eventAggregator);
      this.orderItemEventAggregator.update.subscribe(this.onOrderItemUpdated);
  }

  private onOrderItemUpdated(orderItem: OrderItem) {
    console.log('ORDER ITEM UPDATED', orderItem);
    this._data.clear();
    this.getAll();
  }
}

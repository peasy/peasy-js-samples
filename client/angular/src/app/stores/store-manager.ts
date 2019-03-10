import { OrderItem } from '../contracts';
import { OrderItemStore } from './order-item-store';
import { OrderItemEventAggregator } from '../event-aggregators/order-item-event-aggregator';
import { Injectable } from '@angular/core';
import { InventoryStore } from './inventory-store';
import { InventoryEventAggregator } from '../event-aggregators/inventory-event-aggregator';

@Injectable({ providedIn: 'root' })
export class StoreManager {

  constructor(
    private orderItemsStore: OrderItemStore,
    private orderItemEventAggregator: OrderItemEventAggregator,
    private inventoryStore: InventoryStore,
    private inventoryAggregator: InventoryEventAggregator) {
      // orderItemEventAggregator.update.subscribe(this.onOrderItemChanged);
    }

    private onOrderItemChanged(orderItem: OrderItem): void {
      // delete associated item in inventory store
    }
}

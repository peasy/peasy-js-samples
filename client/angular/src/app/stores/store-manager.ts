import { OrderItem } from '../contracts';
import { OrderItemStore } from './order-item-store';
import { OrderItemEventAggregator } from '../event-aggregators/order-item-event-aggregator';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StoreManager {

  constructor(
    private orderItemsStore: OrderItemStore,
    private orderItemEventAggregator: OrderItemEventAggregator) {
      console.log('MADE IT store manager!!!!');
      // orderItemEventAggregator.update.subscribe(this.onOrderItemChanged);
    }

    private onOrderItemChanged(orderItem: OrderItem): void {
      console.log('MADE IT!!!!', orderItem);
    }
}

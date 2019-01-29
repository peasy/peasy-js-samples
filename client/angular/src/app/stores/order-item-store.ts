import { Injectable } from '@angular/core';
import { Store } from './store';
import { OrderItem } from '../contracts';
import { OrderItemEventAggregator } from '../event-aggregators/order-item-event-aggregator';

@Injectable({ providedIn: 'root' })
export class OrderItemStore extends Store<OrderItem> {
  constructor(protected eventAggregator: OrderItemEventAggregator) {
    super(eventAggregator);
  }
}

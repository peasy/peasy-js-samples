import { Injectable } from '@angular/core';
import { Store } from './store';
import { Order } from '../contracts';
import { OrderEventAggregator } from '../event-aggregators/order-event-aggregator';

@Injectable({ providedIn: 'root' })
export class OrderStore extends Store<Order> {
  constructor(protected eventAggregator: OrderEventAggregator) {
    super(eventAggregator);
  }
}

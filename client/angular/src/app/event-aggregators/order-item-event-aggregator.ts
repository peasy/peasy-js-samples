import { Injectable } from '@angular/core';
import { EventAggregator } from './event-aggregator';
import { OrderItem } from '../contracts';

@Injectable({ providedIn: 'root' })
export class OrderItemEventAggregator extends EventAggregator<OrderItem> {
  constructor() {
    super();
  }
}

import { Injectable } from '@angular/core';
import { EventAggregator } from './event-aggregator';
import { Order } from '../contracts';

@Injectable({ providedIn: 'root' })
export class OrderEventAggregator extends EventAggregator<Order> {
  constructor() {
    super();
  }
}

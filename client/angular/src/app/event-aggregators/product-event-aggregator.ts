import { Injectable } from '@angular/core';
import { EventAggregator } from './event-aggregator';
import { Product } from '../contracts';

@Injectable({ providedIn: 'root' })
export class ProductEventAggregator extends EventAggregator<Product> {
  constructor() {
    super();
  }
}

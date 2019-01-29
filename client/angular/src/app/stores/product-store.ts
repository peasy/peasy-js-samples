import { Injectable } from '@angular/core';
import { Store } from './store';
import { Product } from '../contracts';
import { ProductEventAggregator } from '../event-aggregators/product-event-aggregator';

@Injectable({ providedIn: 'root' })
export class ProductStore extends Store<Product> {
  constructor(protected eventAggregator: ProductEventAggregator) {
    super(eventAggregator);
  }
}

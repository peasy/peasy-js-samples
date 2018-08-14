import { Injectable } from '@angular/core';
import { Store } from './store';
import { Category } from '../contracts';
import { CategoryEventAggregator } from '../event-aggregators/category-event-aggregator';

@Injectable({ providedIn: 'root' })
export class CategoryStore extends Store<Category> {
  constructor(protected eventAggregator: CategoryEventAggregator) {
    super(eventAggregator);
  }
}

import { Injectable } from '@angular/core';
import { EventAggregator } from './event-aggregator';
import { Category } from '../contracts';

@Injectable({ providedIn: 'root' })
export class CategoryEventAggregator extends EventAggregator<Category> {
  constructor() {
    super();
  }
}

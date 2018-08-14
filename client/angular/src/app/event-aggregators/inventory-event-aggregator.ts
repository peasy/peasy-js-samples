import { Injectable } from '@angular/core';
import { EventAggregator } from './event-aggregator';
import { InventoryItem } from '../contracts';

@Injectable({ providedIn: 'root' })
export class InventoryEventAggregator extends EventAggregator<InventoryItem> {
  constructor() {
    super();
  }
}

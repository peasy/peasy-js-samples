import { Injectable } from '@angular/core';
import { EventAggregator } from './event-aggregator';
import { Customer } from '../contracts';

@Injectable({ providedIn: 'root' })
export class CustomerEventAggregator extends EventAggregator<Customer> {
  constructor() {
    super();
  }
}

import { Injectable } from '@angular/core';
import { Store } from './store';
import { Customer } from '../contracts';
import { CustomerEventAggregator } from '../event-aggregators/customer-event-aggregator';

@Injectable({ providedIn: 'root' })
export class CustomerStore extends Store<Customer> {
  constructor(protected eventAggregator: CustomerEventAggregator) {
    super(eventAggregator);
  }
}

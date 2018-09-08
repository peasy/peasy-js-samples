import { Customer } from '../../contracts';
import { ListViewModelBase } from '../../list-view-model-base';
import { Injectable } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CustomerEventAggregator } from '../../event-aggregators/customer-event-aggregator';

@Injectable({ providedIn: 'root' })
export class CustomerListViewModel extends ListViewModelBase<Customer> {
  constructor(protected service: CustomerService, customerEventAggregator: CustomerEventAggregator) {
    super(service);
    customerEventAggregator.update.subscribe(() => super.loadData());
    customerEventAggregator.insert.subscribe(() => super.loadData());
    customerEventAggregator.delete.subscribe(() => super.loadData());
  }
}

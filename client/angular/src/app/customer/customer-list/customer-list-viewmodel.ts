import { Customer } from '../../contracts';
import { ListViewModelBase } from '../../list-view-model-base';
import { Injectable } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CustomerEventAggregator } from '../../event-aggregators/customer-event-aggregator';

@Injectable({ providedIn: 'root' })
export class CustomerListViewModel extends ListViewModelBase<Customer> {
  constructor(protected service: CustomerService, private customerEventAggregator: CustomerEventAggregator) {
    super(service);
  }

  public listen(): void {
    this.customerEventAggregator.update.subscribe(() => super.loadData());
    this.customerEventAggregator.insert.subscribe(() => super.loadData());
    this.customerEventAggregator.delete.subscribe(() => super.loadData());
  }
}

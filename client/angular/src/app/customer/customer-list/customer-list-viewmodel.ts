import { Customer } from '../../contracts';
import { CustomerService } from '../../services/customer.service';
import { ListViewModelBase } from '../../list-view-model-base';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CustomerListViewModel extends ListViewModelBase<Customer> {
  constructor(protected service: CustomerService) {
    super(service);
  }
}

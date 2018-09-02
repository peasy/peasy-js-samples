import { Customer } from '../../contracts';
import { ListViewModelBase } from '../../list-view-model-base';
import { Injectable } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Injectable({ providedIn: 'root' })
export class CustomerListViewModel extends ListViewModelBase<Customer> {
  constructor(protected service: CustomerService) {
    super(service);
  }
}

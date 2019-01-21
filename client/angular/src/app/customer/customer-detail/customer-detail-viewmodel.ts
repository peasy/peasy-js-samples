import { Customer } from '../../contracts';
import { EntityViewModelBase } from '../../entity-view-model-base';
import { CustomerService } from '../../services/customer.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CustomerDetailViewModel extends EntityViewModelBase<Customer> {

  constructor(service: CustomerService) {
    super(service);
  }

  get name(): string {
    return this.CurrentEntity.name;
  }

  set name(value: string) {
    this.setValue('name', value);
  }
}

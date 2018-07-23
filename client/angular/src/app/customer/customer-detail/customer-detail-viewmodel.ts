import { ViewModelBase } from '../../view-model-base';
import { Customer } from '../../contracts';

export class CustomerDetailViewModel extends ViewModelBase<Customer> {

  constructor(protected service, protected entityId: string = null) {
    super(service, entityId);
  }

  get name(): string {
    return this.CurrentEntity.name;
  }

  set name(value: string) {
    this.CurrentEntity.name = value;
    this._isDirty = true;
  }
}

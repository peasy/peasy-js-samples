import { Customer, ViewModelArgs } from '../../contracts';
import { EntityViewModelBase } from '../../entity-view-model-base';

export class CustomerDetailViewModel extends EntityViewModelBase<Customer> {

  constructor(args: ViewModelArgs<Customer>) {
    super(args);
  }

  get name(): string {
    return this.CurrentEntity.name;
  }

  set name(value: string) {
    this.CurrentEntity.name = value;
    this._isDirty = true;
  }
}

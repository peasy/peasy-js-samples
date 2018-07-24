import ViewModelBase from '../viewModels/viewModelBase';

class CustomerViewModel extends ViewModelBase {
  constructor(customerId, customers) {
    super(customerId, customers);
  }

  set name(value) {
    this.entity.name = value;
  }

  get name() {
    return this.entity.name;
  }
}

export default CustomerViewModel;
import ViewModelBase from './viewModelBase';

class CategoryViewModel extends ViewModelBase {
  constructor(categoryId, categories) {
    super(categoryId, categories);
  }

  set name(value) {
    this.entity.name = value;
  }

  get name() {
    return this.entity.name;
  }
}

export default CategoryViewModel;
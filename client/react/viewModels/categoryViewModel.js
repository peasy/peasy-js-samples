import ViewModelBase from '../viewModels/viewModelBase';

class CategoryViewModel extends ViewModelBase {
  constructor(categoryId, categories) {
    super(categoryId, categories);
  }
}

export default CategoryViewModel;
import ViewModelBase from '../viewModels/viewModelBase';

class ProductViewModel extends ViewModelBase {
  constructor(productId, products, categories) {
    super(productId, products);
    this._categories = categories;
  }

  get categorySelectValues() {
    return this._categories.map(c => { return { text: c.name, value: c.id }});
  }
}

export default ProductViewModel;
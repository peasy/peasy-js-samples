import ViewModelBase from './viewModelBase';

class ProductViewModel extends ViewModelBase {
  constructor(productId, products, categories) {
    super(productId, products);
    this._categories = categories;
  }

  set name(value) {
    this.entity.name = value;
  }

  set description(value) {
    this.entity.description = value;
  }

  set price(value) {
    this.entity.price = value;
  }

  set categoryId(value) {
    this.entity.categoryId = value;
  }

  get categorySelectValues() {
    return this._categories.map(c => { return { text: c.name, value: c.id }});
  }
}

export default ProductViewModel;
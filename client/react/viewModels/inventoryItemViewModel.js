import ViewModelBase from '../viewModels/viewModelBase';

class InventoryItemViewModel extends ViewModelBase {
  constructor(itemId, inventoryItems, products) {
    super(itemId, inventoryItems);
    this._products = products;
    this._associatedProduct;
  }

  get associatedProduct() {
    if (!this._associatedProduct) {
      this._associatedProduct = {};
      var productId = this.entity.productId;
      if (productId) {
        this._associatedProduct = this._products.find(p => p.id === productId);
      }
    }
    return this._associatedProduct;
  }

}

export default InventoryItemViewModel;
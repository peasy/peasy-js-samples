import ViewModelBase from '../viewModels/viewModelBase';

class OrderItemViewModel extends ViewModelBase {
  constructor(orderId, orderItemId, orderItems, categories, products, inventoryItems) {
    super(orderItemId, orderItems);
    this.entity.orderId = orderId;
    this._currentCategoryId;
    this._categories = categories;
    this._products = products;
    this._inventoryItems = inventoryItems;
    this._selectedCategoryId;
    this._inventoryCount;
  }

  get categorySelectValues() {
    return this._categories.map(c => { return { text: c.name, value: c.id }});
  }

  get categoryId() {
    if (!this._selectedCategoryId) {
      if (this.entity.productId) {
        var product = this._products.find(p => p.id === this.entity.productId);
        this._selectedCategoryId = product.categoryId;
      }
    }
    return this._selectedCategoryId;
  }

  set categoryId(value) {
    var categoryId = parseInt(value);
    this._selectedCategoryId = categoryId;
    this.productId = null;
  }

  get productId() {
    return this.entity.productId || 0;
  }

  set productId(value) {
    if (value) {
      var productId = parseInt(value);
      var product = this._products.find(p => p.id === productId);
      this.entity.productId = productId;
      this.entity.price = product.price;
      this.entity.amount = this.amount;
    } else {
      delete this.entity.productId;
      this.entity.price = 0;
      this.entity.amount = 0;
    }
    this._inventoryCount = null;
  }

  get availableProducts() {
    if (this.categoryId) {
      return this._products.filter(p => p.categoryId === this.categoryId);
    } 
    return this._products;
  }

  get productSelectValues() {
    return this.availableProducts.map(p => { return { text: p.name, value: p.id }});
  }

  set quantity(value) {
    this.entity.quantity = parseFloat(value) || 0;
    this.entity.amount = this.amount;
  }

  get amount() {
    if (this.entity.quantity && this.entity.price) {
      return this.entity.quantity * this.entity.price;
    }
  }

  get amountFormatted() {
    if (this.amount) {
      return this.formatDollars(this.amount);
    }
  }

  get priceFormatted() {
    if (this.entity.price) {
      return this.formatDollars(this.entity.price);
    }
  }

  get inventoryCount() {
    if (!this._inventoryCount) {
      var productId = this.productId;
      if (productId) {
        var item = this._inventoryItems.find(i => i.productId == productId);
        this._inventoryCount = item.quantityOnHand;
      }
    }
    return this._inventoryCount;
  }

  get submittedOnFormatted() {
    var submittedOn = this.entity.submittedOn;
    if (!submittedOn) return '-';
    return new Date(submittedOn).toLocaleString();
  }

  get shippedOnFormatted() {
    var shippedOn = this.entity.shippedOn;
    if (!shippedOn) return '-';
    return new Date(shippedOn).toLocaleString();
  }

  get productName() {
    var product = this._products.find(p => p.id === this.entity.productId);
    if (product) {
      return product.name;
    } 
    return "";
  }
}

export default OrderItemViewModel;
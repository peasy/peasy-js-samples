function formatDollars(value) {
  return value.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
}

class OrderItemViewModel {
  constructor(orderItem, categories, products, inventoryItems) {
    this._orderItem = orderItem;
    this._currentCategoryId;
    this._categories = categories;
    this._products = products;
    this._inventoryItems = inventoryItems;
  }

  get id() {
    return this._orderItem.id;
  }

  get amountFormatted() {
    return formatDollars(this.amount);
  }

  get amount() {
    return this.price * this.quantity;
  }

  get priceFormatted() {
    return formatDollars(this.price);
  }

  get price() {
    return parseFloat(this._orderItem.price) || 0;
  }

  set price(value) {
    this._orderItem.price = parseFloat(value);
    this._orderItem.amount = this.amount;
  }

  get quantity() {
    return parseFloat(this._orderItem.quantity) || 0;
  }

  set quantity(value) {
    this._orderItem.quantity = parseFloat(value);
    this._orderItem.amount = this.amount;
  }

  get categoryId() {
    return this._currentCategoryId;
  }

  set categoryId(value) {
    this._currentCategoryId = parseInt(value);
    this.productId = null;
  }

  get categories() {
    return this._categories || [];
  }

  get products() {
    if (this._currentCategoryId) {
      return this._products.filter(p => p.categoryId === this._currentCategoryId);
    }
    return this._products;
  }

  get productId() {
    return parseInt(this._orderItem.productId) || 0;
  }

  set productId(value) {
    if (value) {
      var productId = parseInt(value);
      var product = this._products.find(p => parseInt(p.id) === productId);
      this._orderItem.productId = product.id;
      this.price = product.price;
    } else {
      delete this._orderItem.productId;
      this.price = 0;
    }
  }

  get productName() {
    var product = this.products.find(p => p.id === this.productId);
    if (product) {
      return product.name;
    } 
    return "";
  }

  get submittedOn() {
    var submittedOn = this._orderItem.submittedOn;
    if (!submittedOn) return '-';
    return new Date(submittedOn).toLocaleString();
  }

  get shippedOn() {
    var shippedOn = this._orderItem.shippedOn;
    if (!shippedOn) return '-';
    return new Date(shippedOn).toLocaleString();
  }

  get status() {
    return this._orderItem.status || '';
  }

  get canDelete() {
    return this._orderItem.status !== "SHIPPED";
  }

  get canShip() {
    return this._orderItem.status === "SUBMITTED" ||
           this._orderItem.status === "BACKORDERED";
  }

  get orderId() {
    return this._orderItem.orderId;
  }
}

export default OrderItemViewModel;
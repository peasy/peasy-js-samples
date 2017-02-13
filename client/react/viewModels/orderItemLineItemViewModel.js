class OrderItemLineItemViewModel {

  constructor(orderItem, products) {
    this._orderItem = orderItem;
    this._products = products;
    this._associatedProduct;
  }

  get orderItem() {
    return this._orderItem;
  }

  get productName() {
    return this.product.name;
  }

  get product() {
    if (!this._associatedProduct) {
      this._associatedProduct = this._products.find(p => p.id === this._orderItem.productId);
    }
    return this._associatedProduct;
  }

  get amountFormatted() {
    if (this._orderItem.amount) {
      return this.formatDollars(this._orderItem.amount);
    }
  }

  get priceFormatted() {
    if (this._orderItem.price) {
      return this.formatDollars(this._orderItem.price);
    }
  }

  formatDollars(value) {
    return value.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
  }

  get submittedOnFormatted() {
    var submittedOn = this._orderItem.submittedOn;
    if (!submittedOn) return '-';
    return new Date(submittedOn).toLocaleString();
  }

  get shippedOnFormatted() {
    var shippedOn = this._orderItem.shippedOn;
    if (!shippedOn) return '-';
    return new Date(shippedOn).toLocaleString();
  }

  get canDelete() {
    return this._orderItem.status !== "SHIPPED";
  }

  get canShip() {
    return this._orderItem.status === "SUBMITTED" ||
           this._orderItem.status === "BACKORDERED";
  }
}

export default OrderItemLineItemViewModel;
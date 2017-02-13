class OrderLineItemViewModel {

  constructor(order, orderItems, customers) {
    this._order = order;
    this._orderItems = orderItems;
    this._customers = customers;
    this._associatedCustomer;
    this._associatedOrderItems;
  }

  get orderId() {
    return this._order.id;
  }

  get orderDate() {
    return this._order.orderDate;
  }

  get orderDateFormatted() {
    return new Date(this.orderDate).toLocaleString();
  }

  get customerName() {
    return this.customer.name;
  }

  get totalFormatted() {
    if (this.total) {
      return this.formatDollars(this.total);
    }
  }

  formatDollars(value) {
    return value.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
  }

  get total() {
    if (this.orderItems.length > 0) {
      return this.orderItems.map(i => i.amount).reduce((a = 0, b) => a + b);
    }
  }

  get status() {
    if (!this.orderItems) return "";

    if (this.orderItems.some(i => i.status === "BACKORDERED")) {
      return "BACKORDERED";
    }

    if (this.orderItems.some(i => i.status === "PENDING")) {
      return "PENDING";
    }

    if (this.orderItems.some(i => i.status === "SUBMITTED")) {
      return "SUBMITTED";
    }

    if (this.orderItems.some(i => i.status === "SHIPPED")) {
      return "SHIPPED";
    }
  }

  get customer() {
    if (!this._associatedCustomer) {
      this._associatedCustomer = this._customers.find(c => c.id === this._order.customerId);
    }
    return this._associatedCustomer;
  }

  get orderItems() {
    if (!this._associatedOrderItems) {
      this._associatedOrderItems = this._orderItems.filter(i => i.orderId === this._order.id);
    }
    return this._associatedOrderItems;
  }
}

export default OrderLineItemViewModel;
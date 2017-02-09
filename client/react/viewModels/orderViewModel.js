import OrderItemViewModel from './orderItemViewModel';

function formatDollars(value) {
  return value.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
}

class OrderViewModel {
  constructor(orderId, customers, orders, orderItems, categories, products) {
    this._orderId = orderId;
    this._currentOrder;
    this._currentCustomer;
    this._currentOrderItems;
    this._customers = customers;
    this._orders = orders;
    this._orderItems = orderItems;
    this._categories = categories;
    this._products = products;
  }

  get orderItems() {
    if (!this._currentOrderItems) {
      this._currentOrderItems = this._orderItems
        .filter(i => i.orderId === this._orderId)
        .map(i => { return new OrderItemViewModel(i, this._categories, this._products) }); 
    }
    return this._currentOrderItems;
  }

  get id() {
    return this.order.id;
  }

  get order() {
    if (!this._currentOrder) {
      this._currentOrder = this._orders.find(o => o.id === this._orderId);
    }
    return this._currentOrder;
  }

  get total() {
    if (this.orderItems.length > 0) {
      return this.orderItems.map(i => i.amount).reduce((a = 0, b) => a + b)
    }
    return 0;
  }

  get totalFormatted() {
    return formatDollars(this.total);
  }

  get orderDate() {
    return this.order.orderDate;
  }

  get customer() {
    if (!this._currentCustomer) {
      this._currentCustomer = this._customers.find(c => c.id === this.order.customerId);
    }
    return this._currentCustomer;
  }

  get customerName() {
    return this.customer.name;
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
}

export default OrderViewModel;
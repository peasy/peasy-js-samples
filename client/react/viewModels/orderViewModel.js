import OrderItemViewModel from './orderItemViewModel';

function formatDollars(value) {
  return value.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
}

class OrderViewModel {
  constructor(orderId, orderItems, categories, products) {
    this._orderId = orderId;
    this._orderItems = orderItems;
    this._categories = categories;
    this._products = products;
  }

  get orderItems() {
    return this._orderItems
            .filter(i => i.orderId === this._orderId)
            .map(i => { return new OrderItemViewModel(i, this._categories, this._products) }); 
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
}

export default OrderViewModel;
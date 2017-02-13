import OrderItemLineItemViewModel from './orderItemLineItemViewModel';
import ViewModelBase from '../viewModels/viewModelBase';
import ordersDotCom from '../../businessLogic';

class OrderViewModel extends ViewModelBase {
  constructor(orderId, customers, orders, orderItems, categories, products) {
    super(orderId, orders);
    this._currentOrder;
    this._currentCustomer;
    this._currentOrderItems;
    this._customers = customers;
    this._orders = orders;
    this._orderItems = orderItems;
    this._categories = categories;
    this._products = products;
  }

  get customerSelectValues() {
    return this._customers.map(c => { return { text: c.name, value: c.id }});
  }

  get orderItems() {
    if (!this._currentOrderItems) {
      this._currentOrderItems = this._orderItems
        .filter(i => i.orderId === this.entity.id)
        .map(i => { return new OrderItemLineItemViewModel(i, this._products) }); 
    }
    return this._currentOrderItems;
  }

  get id() {
    return this.order.id;
  }

  get order() {
    if (!this._currentOrder) {
      this._currentOrder = this._orders.find(o => o.id === this.entity.id);
      if (!this._currentOrder) {
        this._currentOrder = {};
      } else {
        this._currentOrder = Object.assign({}, this._currentOrder);
      }
    }
    return this._currentOrder;
  }

  get total() {
    if (this.orderItems.length > 0) {
      return this.orderItems.map(i => i.orderItem.amount).reduce((a = 0, b) => a + b)
    }
    return 0;
  }

  get totalFormatted() {
    return this.formatDollars(this.total);
  }

  get orderDate() {
    return this.order.orderDate;
  }

  get customer() {
    if (!this._currentCustomer) {
      this._currentCustomer = this._customers.find(c => c.id === this.order.customerId);
      if (!this._currentCustomer) {
        this._currentCustomer = {};
      }
    }
    return this._currentCustomer;
  }

  get customerName() {
    return this.customer.name;
  }

  get customers() {
    return this._customers;
  }

  set customerId(value) {
    this._currentCustomer = null;
    this.entity.customerId = value;
  }

  get canAddItem() {
    return this.entity.id;
  }

  get hasPendingItems() {
    var orderItems = this.orderItems.map(vm => vm.orderItem);
    return ordersDotCom.services.orderService.hasPendingItems(this.entity.id, this.orderItems);
  }
}

export default OrderViewModel;
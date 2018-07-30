import { ListViewModelBase } from '../../list-view-model-base';
import { Order } from '../../contracts';
import { OrderService } from '../../services/order.service';
import { CustomerListViewModel } from '../../customer/customer-list/customer-list-viewmodel';
import { OrderItemListViewModel } from '../../order-item/order-item-list/order-item-list-viewmodel';
import { Injectable } from '../../../../node_modules/@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderListViewModel extends ListViewModelBase<Order> {

  constructor(
    protected service: OrderService,
    private customersVM: CustomerListViewModel,
    private orderItemsVM: OrderItemListViewModel) {
      super(service);
  }

  loadData() {
    super.loadData();
    this.customersVM.loadData();
    this.orderItemsVM.loadData();
  }

  getCustomerNameFor(customerId: string): string {
    const customers = this.customersVM.data;
    if (customers) {
      return customers.find(c => c.id === customerId).name;
    }
    return null;
  }

  getStatusFor(orderId: string): string {
    const allOrderItems = this.orderItemsVM.data;
    if (allOrderItems) {
      const orderItems = allOrderItems.filter(i => i.orderId === orderId);
      return this.service.getStatusFor(orderItems);
    }
    return null;
  }

  getTotalFor(orderId: string): number {
    const allOrderItems = this.orderItemsVM.data;
    if (allOrderItems) {
      return allOrderItems.filter(i => i.orderId === orderId)
        .map(i => i.amount)
        .reduce((a, b) => a + b, 0);
    }
    return null;
  }
}


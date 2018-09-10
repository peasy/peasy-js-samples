import { ListViewModelBase } from '../../list-view-model-base';
import { Order } from '../../contracts';
import { OrderService } from '../../services/order.service';
import { CustomerListViewModel } from '../../customer/customer-list/customer-list-viewmodel';
import { OrderItemListViewModel } from '../../order-item/order-item-list/order-item-list-viewmodel';
import { Injectable } from '@angular/core';
import { OrderEventAggregator } from '../../event-aggregators/order-event-aggregator';
import { OrderItemEventAggregator } from '../../event-aggregators/order-item-event-aggregator';

@Injectable({ providedIn: 'root' })
export class OrderListViewModel extends ListViewModelBase<Order> {

  constructor(
    protected service: OrderService,
    private customersVM: CustomerListViewModel,
    private orderItemsVM: OrderItemListViewModel,
    private orderEventAggregator: OrderEventAggregator,
    private orderItemEventAggregator: OrderItemEventAggregator) {
      super(service);
      orderEventAggregator.insert.subscribe(() => super.loadData());
      orderItemEventAggregator.insert.subscribe((i) => this.orderItemsVM.loadData());
      orderItemEventAggregator.update.subscribe((i) => this.orderItemsVM.loadData());
      orderItemEventAggregator.delete.subscribe((i) => this.orderItemsVM.loadData());
  }

  async loadData(): Promise<boolean> {
    console.log('order list vm.loadData()');
    const results = await Promise.all
    ([
      super.loadData(),
      this.customersVM.loadData(),
      this.orderItemsVM.loadData()
    ]);
    return results.every(r => r === true);
  }

  getCustomerNameFor(customerId: string): string {
    const customers = this.customersVM.data;
    if (customers.length > 0) {
      return customers.find(c => c.id === customerId).name;
    }
    return null;
  }

  getStatusFor(orderId: string): string {
    console.log('order list vm.getStatusFOr()', this.orderItemsVM.data);
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


import { EntityViewModelBase } from '../../entity-view-model-base';
import { ViewModelArgs, Order, Customer, OrderItem } from '../../contracts';
import { CustomerListViewModel } from '../../customer/customer-list/customer-list-viewmodel';
import { OrderItemListViewModel } from '../../order-item/order-item-list/order-item-list-viewmodel';
import { Injectable } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderItemService } from '../../services/order-item.service';
import { OrderItemEventAggregator } from '../../event-aggregators/order-item-event-aggregator';

@Injectable({ providedIn: 'root' })
export class OrderDetailViewModel extends EntityViewModelBase<Order> {

  constructor(
    protected service: OrderService,
    private customersVM: CustomerListViewModel,
    public orderItemsVM: OrderItemListViewModel,
    private orderItemService: OrderItemService,
    private orderItemEventAggregator: OrderItemEventAggregator) {
      super(service);
      orderItemEventAggregator.insert.subscribe((i) => this.orderItemsVM.loadDataFor(i.orderId));
      orderItemEventAggregator.update.subscribe((i) => this.orderItemsVM.loadDataFor(i.orderId));
      orderItemEventAggregator.delete.subscribe((i) => this.orderItemsVM.loadDataFor(i.orderId));
  }

  get isBusy() {
    return super['isBusy'] || this.customersVM.isBusy || this.orderItemsVM.isBusy;
  }

  loadData(args: ViewModelArgs<Order>): any {
    super.loadData(args);
    this.customersVM.loadData();
    this.orderItemsVM.loadDataFor(args.entityID);
  }

  get customerId(): string {
    return this.CurrentEntity.customerId || '';
  }

  set customerId(value: string) {
    this.CurrentEntity.customerId = value;
    this._isDirty = true;
  }

  get customers(): Customer[] {
    const defaultItem = { name: 'Select Customer ...', id: '' } as Customer;
    if (this.customersVM.data) {
      return [defaultItem, ...this.customersVM.data];
    }
    return [defaultItem];
  }

  get orderItems(): OrderItem[] {
    return this.orderItemsVM.data;
  }

  get orderTotal(): number {
    if (this.orderItems && this.orderItems.length) {
      return this.orderItems.map(i => i.amount).reduce((a = 0, b) => a + b);
    }
    return 0;
  }

  get canSubmit(): boolean {
    return this.orderItemService.anySubmittable(this.orderItems);
  }

  async submitOrder() {
    if (this.canSubmit) {
      this.orderItemsVM.submitAllSubmittable();
    }
  }

  public async destroyOrderItem(orderItem: OrderItem): Promise<void> {
    await this.orderItemsVM.destroy(orderItem.id);
  }
}

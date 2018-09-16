import { EntityViewModelBase } from '../../entity-view-model-base';
import { ViewModelArgs, Order, Customer, OrderItem } from '../../contracts';
import { CustomerListViewModel } from '../../customer/customer-list/customer-list-viewmodel';
import { OrderItemListViewModel } from '../../order-item/order-item-list/order-item-list-viewmodel';
import { Injectable } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Injectable({ providedIn: 'root' })
export class OrderDetailViewModel extends EntityViewModelBase<Order> {

  constructor(
    protected service: OrderService,
    private customersVM: CustomerListViewModel,
    public orderItemsVM: OrderItemListViewModel) {
      super(service);
  }

  public onOrderItemChanged(orderItem: OrderItem) {
    if (this.id === orderItem.orderId) {
      this.orderItemsVM.loadDataFor(this.id);
    }
  }

  public get isBusy() {
    return super['isBusy'] || this.customersVM.isBusy || this.orderItemsVM.isBusy;
  }

  public loadData(args: ViewModelArgs<Order>): any {
    super.loadData(args);
    this.customersVM.loadData();
    this.orderItemsVM.loadDataFor(args.entityID);
  }

  public get customerId(): string {
    return this.CurrentEntity.customerId || '';
  }

  public set customerId(value: string) {
    this.CurrentEntity.customerId = value;
    this._isDirty = true;
  }

  public get customers(): Customer[] {
    const defaultItem = { name: 'Select Customer ...', id: '' } as Customer;
    if (this.customersVM.data) {
      return [defaultItem, ...this.customersVM.data];
    }
    return [defaultItem];
  }

  public get orderItems(): OrderItem[] {
    return this.orderItemsVM.data;
  }

  public get orderTotal(): number {
    if (this.orderItems && this.orderItems.length) {
      return this.orderItems.map(i => i.amount).reduce((a = 0, b) => a + b);
    }
    return 0;
  }

  public get canSubmit(): boolean {
    if (this.orderItemsVM.items && this.orderItemsVM.items.length) {
      return this.orderItemsVM.items.some(vm => vm.canSubmit);
    }
    return false;
  }

  public async submitOrder() {
    if (this.canSubmit) {
      this.orderItemsVM.submitAllSubmittable();
    }
  }

  public async destroyOrderItem(orderItem: OrderItem): Promise<void> {
    await this.orderItemsVM.destroy(orderItem.id);
  }
}

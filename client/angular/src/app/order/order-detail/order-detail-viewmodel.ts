import { EntityViewModelBase } from '../../entity-view-model-base';
import { ViewModelArgs, Order, Customer, OrderItem } from '../../contracts';
import { CustomerListViewModel } from '../../customer/customer-list/customer-list-viewmodel';
import { OrderItemListViewModel } from '../../order-item/order-item-list/order-item-list-viewmodel';
import { Injectable } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderItemDetailViewModel } from '../../order-item/order-item-detail/order-item-detail-viewmodel';
import { OrderItemService } from '../../services/order-item.service';

@Injectable({ providedIn: 'root' })
export class OrderDetailViewModel extends EntityViewModelBase<Order> {

  constructor(
    protected service: OrderService,
    private customersVM: CustomerListViewModel,
    private orderItemsVM: OrderItemListViewModel,
    private orderItemService: OrderItemService) {
      super(service);
  }

  get isBusy() {
    return super['isBusy'] || this.customersVM.isBusy;
    // return super['isBusy'] || this.customersVM.isBusy || this.orderItemsVM.isBusy;
  }

  loadData(args: ViewModelArgs<Order>): any {
    super.loadData(args);
    this.customersVM.loadData();
    // this.orderItemsVM.loadDataFor(args.entityID);
  }

  get customerId(): string {
    return this.CurrentEntity.customerId;
  }

  set customerId(value: string) {
    this.CurrentEntity.customerId = value;
    this._isDirty = true;
  }

  get customers(): Customer[] {
    return this.customersVM.data;
  }

  get orderItems(): OrderItem[] {
    return this.orderItemsVM.data;
  }

  get orderTotal(): number {
    if (this.orderItemsVM.data && this.orderItemsVM.data.length) {
      return this.orderItemsVM.data.map(i => i.amount).reduce((a = 0, b) => a + b);
    }
    return 0;
  }

  get canSubmit(): boolean {
    return this.orderItemService.anySubmittable(this.orderItems);
  }

  async submitOrder() {
    if (this.canSubmit) {
      const items = this.orderItemsVM.data.filter(i => this.orderItemService.canSubmit(i));
      // TODO: figure out how to make this part of the view model handle chain (ie setting busy status, handling errors, etc)
      await items.map(i => this.orderItemService.submit(i.id));
      this.orderItemsVM.loadDataFor(this.id);
    }
  }

  // deleteOrderItem(id) {
  //   this.orderItemsVM.destroy(id);
  // }
}

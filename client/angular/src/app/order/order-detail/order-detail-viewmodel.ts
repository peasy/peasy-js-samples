import { EntityViewModelBase } from '../../entity-view-model-base';
import { ViewModelArgs, Order, Customer, OrderItem } from '../../contracts';
import { CustomerListViewModel } from '../../customer/customer-list/customer-list-viewmodel';
import { OrderItemListViewModel } from '../../order-item/order-item-list/order-item-list-viewmodel';
import { Injectable } from '../../../../node_modules/@angular/core';
import { OrderService } from '../../services/order.service';

@Injectable({ providedIn: 'root' })
export class OrderDetailViewModel extends EntityViewModelBase<Order> {

  constructor(
    protected service: OrderService,
    private customersVM: CustomerListViewModel,
    private orderItemsVM: OrderItemListViewModel) {
      super(service);
  }

  get isBusy() {
    return super['isBusy'] || this.customersVM.isBusy || this.orderItemsVM.isBusy;
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

}

import { Injectable } from '@angular/core';
import { OrderItem, ExecutionResult } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';
import { OrderItemStore } from '../stores/order-item-store';

@Injectable({ providedIn: 'root' })
export class OrderItemService extends ServiceBase<OrderItem> {

  constructor(store: OrderItemStore) {
    super(store, ordersDotCom.services.orderItemService);
  }

  public getByOrder(orderId: string): Promise<ExecutionResult<OrderItem[]>> {
    return super.handle(ordersDotCom.services.orderItemService.getByOrderCommand(orderId));
  }

  public submit(orderItemId: string): Promise<ExecutionResult<OrderItem>> {
    return super.handle(ordersDotCom.services.orderItemService.submitCommand(orderItemId));
    // TODO: refresh inventory
  }

  public async ship(orderItemId: string): Promise<ExecutionResult<OrderItem>> {
    const result = await super.handle<OrderItem>(ordersDotCom.services.orderItemService.shipCommand(orderItemId));
    this.store.update(result.value);
    return result;
  }

  public canDelete(item: OrderItem): boolean {
    return ordersDotCom.services.orderItemService.canDelete(item);
  }

  public canSubmit(item: OrderItem): boolean {
    return item.status === 'PENDING';
  }

  public canShip(item: OrderItem): boolean {
    return ordersDotCom.services.orderItemService.canShip(item);
  }

  public anySubmittable(orderItems: OrderItem[]): boolean {
    return orderItems.some(i => i.status === 'PENDING');
  }

}

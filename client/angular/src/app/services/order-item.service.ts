import { Injectable } from '@angular/core';
import { OrderItem, ExecutionResult } from '../contracts';
import { OrderItemDataProxy } from '../data-proxies/http/order-item-data-proxy';
import { ServiceBase } from './service-base';

@Injectable({ providedIn: 'root' })
export class OrderItemService extends ServiceBase<OrderItem> {

  constructor(dataProxy: OrderItemDataProxy) {
    super(dataProxy);
  }

  public getByOrder(orderId: string): Promise<ExecutionResult<OrderItem[]>> {
    // return super.handle(ordersDotCom.services.orderItemService.getByOrderCommand(orderId));
    return null;
  }

  public async submit(orderItemId: string): Promise<ExecutionResult<OrderItem>> {
    // const result = await super.handle<OrderItem>(ordersDotCom.services.orderItemService.submitCommand(orderItemId));
    // this.store.update(result.value);
    // return result;
    return null;
  }

  public async ship(orderItemId: string): Promise<ExecutionResult<OrderItem>> {
    // const result = await super.handle<OrderItem>(ordersDotCom.services.orderItemService.shipCommand(orderItemId));
    // this.store.update(result.value);
    // return result;
    return null;
  }

  public canDelete(item: OrderItem): boolean {
    // return ordersDotCom.services.orderItemService.canDelete(item);
    return false;
  }

  public canSubmit(item: OrderItem): boolean {
    return item.status === 'PENDING';
  }

  public canShip(item: OrderItem): boolean {
    // return ordersDotCom.services.orderItemService.canShip(item);
    return false;
  }

  public anySubmittable(orderItems: OrderItem[]): boolean {
    return orderItems.some(i => i.status === 'PENDING');
  }

}

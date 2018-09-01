import { Injectable } from '@angular/core';
import { OrderItem, ExecutionResult } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';
import { OrderItemStore } from '../stores/order-item-store';
import { OrderItemDataProxy } from '../data-proxies/http/event-emitter';
import { ServiceBaseII } from './customer.service-II';

@Injectable({ providedIn: 'root' })
export class OrderItemService extends ServiceBaseII<OrderItem> {

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

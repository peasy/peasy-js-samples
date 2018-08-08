import { Injectable } from '@angular/core';
import { OrderItem, ExecutionResult } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';

@Injectable({ providedIn: 'root' })
export class OrderItemService extends ServiceBase<OrderItem> {

  constructor() {
    super(ordersDotCom.services.orderItemService);
  }

  public getByOrder(orderId: string): Promise<ExecutionResult<OrderItem[]>> {
    return super.handle(ordersDotCom.services.orderItemService.getByOrderCommand(orderId));
  }

  public submit(orderItemId: string): Promise<ExecutionResult<OrderItem>> {
    return super.handle(ordersDotCom.services.orderItemService.submitCommand(orderItemId));
  }

  public ship(orderItemId: string): Promise<ExecutionResult<OrderItem>> {
    return super.handle(ordersDotCom.services.orderItemService.shipCommand(orderItemId));
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

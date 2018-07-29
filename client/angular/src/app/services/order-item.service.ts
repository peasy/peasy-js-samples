import { Injectable } from '@angular/core';
import { OrderItem, ExecutionResult } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';

@Injectable({ providedIn: 'root' })
export class OrderItemService extends ServiceBase<OrderItem> {

  constructor() {
    super(ordersDotCom.services.orderItemService);
  }

  getByOrder(orderId: string): Promise<ExecutionResult<OrderItem[]>> {
    return this.handle(ordersDotCom.services.orderItemService.getByOrderCommand(orderId));
  }

}

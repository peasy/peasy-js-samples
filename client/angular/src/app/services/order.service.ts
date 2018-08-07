import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';

@Injectable({ providedIn: 'root' })
export class OrderService extends ServiceBase<Order> {

  constructor() {
    super(ordersDotCom.services.orderService);
  }

  getStatusFor(orderItems: OrderItem[]): string {
    return ordersDotCom.services.orderService.status(orderItems);
  }

  hasPendingItems(orderItems: OrderItem[]) {
    return orderItems.some(i => i.status === 'PENDING');
  }

}

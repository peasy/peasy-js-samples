import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';
import { OrderStore } from '../stores/order-store';

@Injectable({ providedIn: 'root' })
export class OrderService extends ServiceBase<Order> {

  constructor(store: OrderStore) {
    super(store, ordersDotCom.services.orderService);
  }

  getStatusFor(orderItems: OrderItem[]): string {
    return ordersDotCom.services.orderService.status(orderItems);
  }

  hasPendingItems(orderItems: OrderItem[]) {
    return orderItems.some(i => i.status === 'PENDING');
  }

}

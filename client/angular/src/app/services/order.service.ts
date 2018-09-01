import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../contracts';
import { OrderDataProxy } from '../data-proxies/http/order-data-proxy';
import { ServiceBase } from './service-base';

@Injectable({ providedIn: 'root' })
export class OrderService extends ServiceBase<Order> {

  constructor(dataProxy: OrderDataProxy) {
    super(dataProxy);
  }

  getStatusFor(orderItems: OrderItem[]): string {
    // return ordersDotCom.services.orderService.status(orderItems);
    return null;
  }

  hasPendingItems(orderItems: OrderItem[]) {
    return orderItems.some(i => i.status === 'PENDING');
  }
}

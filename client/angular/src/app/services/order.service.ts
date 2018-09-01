import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';
import { OrderStore } from '../stores/order-store';
import { ServiceBaseII } from './customer.service-II';
import { OrderDataProxy } from '../data-proxies/http/event-emitter';

@Injectable({ providedIn: 'root' })
export class OrderService extends ServiceBaseII<Order> {

  constructor(dataProxy: OrderDataProxy) {
    super(dataProxy);
  }

  getStatusFor(orderItems: OrderItem[]): string {
    return ordersDotCom.services.orderService.status(orderItems);
  }

  hasPendingItems(orderItems: OrderItem[]) {
    return orderItems.some(i => i.status === 'PENDING');
  }
}

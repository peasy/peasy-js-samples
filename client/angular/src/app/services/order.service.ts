import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../contracts';
import { ServiceBase } from './service-base';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';
import ordersDotCom from '../../../../businessLogic.js';

@Injectable({ providedIn: 'root' })
export class OrderService extends ServiceBase<Order> {

  constructor(proxyFactory: DataProxyFactory) {
    super(proxyFactory.orderDataProxy);
  }

  getStatusFor(orderItems: OrderItem[]): string {
    return ordersDotCom.services.orderService.status(orderItems);
  }

  hasPendingItems(orderItems: OrderItem[]) {
    return orderItems.some(i => i.status === 'PENDING');
  }
}

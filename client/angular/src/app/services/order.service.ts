import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../contracts';
import { BusinessService, Rule } from 'peasy-js';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';
import ordersDotCom from '../../../../businessLogic.js';

@Injectable({ providedIn: 'root' })
export class OrderService extends BusinessService<Order, string> {

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

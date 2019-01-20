import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../contracts';
import { BusinessService, Rule, ICommand, Command } from 'peasy-js';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';
import ordersDotCom from '../../../../businessLogic.js';

@Injectable({ providedIn: 'root' })
export class OrderService extends BusinessService<Order, string> {

  constructor(private proxyFactory: DataProxyFactory) {
    super(proxyFactory.orderDataProxy);
  }

  getStatusFor(orderItems: OrderItem[]): string {
    return ordersDotCom.services.orderService.status(orderItems);
  }

  hasPendingItems(orderItems: OrderItem[]) {
    return orderItems.some(i => i.status === 'PENDING');
  }

  public getByCustomerCommand(customerId: string): ICommand<Order[]> {
    return new Command<Order[]>({
      _onValidationSuccess: () => {
        return this.proxyFactory.orderDataProxy.getByCustomer(customerId);
      }
    });
  }
}

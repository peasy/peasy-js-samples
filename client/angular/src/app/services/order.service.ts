import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../contracts';
import { BusinessService, ICommand, Command, IRule } from 'peasy-js';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';
import { FieldRequiredRule } from '../rules/fieldRequiredRule';

@Injectable({ providedIn: 'root' })
export class OrderService extends BusinessService<Order, string> {

  constructor(private proxyFactory: DataProxyFactory) {
    super(proxyFactory.orderDataProxy);
  }

  _getRulesForInsertCommand(order: Order, context: object): Promise<IRule[]> {
    return Promise.resolve([
      new FieldRequiredRule('customerId', order, 'customer')
    ]);
  }

  _getRulesForUpdateCommand(order: Order, context: object): Promise<IRule[]> {
    return Promise.resolve([
      new FieldRequiredRule('customerId', order, 'customer')
    ]);
  }

  getStatusFor(orderItems: OrderItem[]): string {
    if (!orderItems || orderItems.length === 0) {
      return '';
    }

    if (orderItems.some(i => i.status === 'BACKORDERED')) {
      return 'BACKORDERED';
    }

    if (orderItems.some(i => i.status === 'PENDING')) {
      return 'PENDING';
    }

    if (orderItems.some(i => i.status === 'SUBMITTED')) {
      return 'SUBMITTED';
    }

    if (orderItems.some(i => i.status === 'SHIPPED')) {
      return 'SHIPPED';
    }
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

import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../contracts';
import { BusinessService, ICommand, Command, IRule } from 'peasy-js';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';
import ordersDotCom from '../../../../businessLogic.js';
import { FieldRequiredRule } from '../rules/fieldRequiredRule';

@Injectable({ providedIn: 'root' })
export class OrderService extends BusinessService<Order, string> {

  constructor(private proxyFactory: DataProxyFactory) {
    super(proxyFactory.orderDataProxy);
  }

  _getRulesForInsertCommand(order: Order, context: Object): Promise<IRule[]> {
    return Promise.resolve([
      new FieldRequiredRule('customerId', order, 'customer')
    ]);
  }

  _getRulesForUpdateCommand(order: Order, context: Object): Promise<IRule[]> {
    return Promise.resolve([
      new FieldRequiredRule('customerId', order, 'customer')
    ]);
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

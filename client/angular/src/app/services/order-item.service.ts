import { Injectable } from '@angular/core';
import { OrderItem } from '../contracts';
import { ServiceBase } from './service-base';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';
import { ServiceCommand } from '../commands/service-command';
import ordersDotCom from '../../../../businessLogic.js';

@Injectable({ providedIn: 'root' })
export class OrderItemService extends ServiceBase<OrderItem> {

  constructor(protected proxyFactory: DataProxyFactory) {
    super(proxyFactory.orderItemDataProxy);
  }

  public getByOrderCommand(orderId: string): ServiceCommand<OrderItem[]> {
    const service = this;
    return new ServiceCommand<OrderItem[]>({
      _onValidationSuccess: function() {
        return service.proxyFactory.orderItemDataProxy.getByOrder(orderId);
      }
    });
  }

  public submitCommand(orderItemId: string): ServiceCommand<OrderItem> {
    const service = this;
    return new ServiceCommand<OrderItem>({
      _onValidationSuccess: function(context) {
        return service.proxyFactory.orderItemDataProxy.submit(orderItemId);
      }
    });
  }

  public shipCommand(orderItemId: string): ServiceCommand<OrderItem> {
    const service = this;
    return new ServiceCommand<OrderItem>({
      _onValidationSuccess: function(context) {
        return service.proxyFactory.orderItemDataProxy.ship(orderItemId);
      }
    });
  }

  public canDelete(item: OrderItem): boolean {
    return ordersDotCom.services.orderItemService.canDelete(item);
  }

  public canSubmit(item: OrderItem): boolean {
    return item.status === 'PENDING';
  }

  public canShip(item: OrderItem): boolean {
    return ordersDotCom.services.orderItemService.canShip(item);
  }

  public anySubmittable(orderItems: OrderItem[]): boolean {
    orderItems = orderItems || [];
    return orderItems.some(i => i.status === 'PENDING');
  }

}

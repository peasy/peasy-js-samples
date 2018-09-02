import { Injectable } from '@angular/core';
import { OrderItem, ExecutionResult, IOrderItemDataProxy } from '../contracts';
import { ServiceBase } from './service-base';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';
import { ServiceCommand } from '../commands/service-command';

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

  public async submit(orderItemId: string): Promise<ExecutionResult<OrderItem>> {
    // const result = await super.handle<OrderItem>(ordersDotCom.services.orderItemService.submitCommand(orderItemId));
    // this.store.update(result.value);
    // return result;
    return null;
  }

  public async ship(orderItemId: string): Promise<ExecutionResult<OrderItem>> {
    // const result = await super.handle<OrderItem>(ordersDotCom.services.orderItemService.shipCommand(orderItemId));
    // this.store.update(result.value);
    // return result;
    return null;
  }

  public canDelete(item: OrderItem): boolean {
    // return ordersDotCom.services.orderItemService.canDelete(item);
    return false;
  }

  public canSubmit(item: OrderItem): boolean {
    return item.status === 'PENDING';
  }

  public canShip(item: OrderItem): boolean {
    // return ordersDotCom.services.orderItemService.canShip(item);
    return false;
  }

  public anySubmittable(orderItems: OrderItem[]): boolean {
    return orderItems.some(i => i.status === 'PENDING');
  }

}

import { Injectable } from '@angular/core';
import { OrderItem } from '../contracts';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';
import { BusinessService, Command, IRule, Rule } from 'peasy-js';
import { stripAllFieldsFrom } from '../../../../../business_logic/shared/utils';
import { FieldRequiredRule } from '../rules/fieldRequiredRule';
import { OrderItemPriceValidityRule } from '../rules/orderItemPriceValidityRule';
import { OrderItemAmountValidityRule } from '../rules/orderItemAmountValidityRule';
import { ValidOrderItemStatusForUpdateRule } from '../rules/validOrderItemStatusForUpdateRule';
import { convert } from '../../../../../business_logic/shared/utils';

@Injectable({ providedIn: 'root' })
export class OrderItemService extends BusinessService<OrderItem, string> {

  constructor(protected proxyFactory: DataProxyFactory) {
    super(proxyFactory.orderItemDataProxy);
  }

  protected _onInsertCommandInitialization(data: OrderItem, context: object): Promise<void> {
    stripAllFieldsFrom(data).except(['orderId', 'productId', 'quantity', 'amount', 'price']);
    data.status = 'PENDING';
    convert(data, 'quantity').toFloat();
    convert(data, 'amount').toFloat();
    convert(data, 'price').toFloat();
    return Promise.resolve();
  }

  protected _getRulesForInsertCommand(item: OrderItem, context: object): Promise<IRule[]> {
    const productDataProxy = this.proxyFactory.productDataProxy;
    return Promise.resolve([
      Rule.ifAllValid([
        new FieldRequiredRule('quantity', item),
        new FieldRequiredRule('amount', item),
        new FieldRequiredRule('price', item),
        new FieldRequiredRule('productId', item, 'product'),
        new FieldRequiredRule('orderId', item)
      ])
      .thenGetRules(async () => {
        const product = await productDataProxy.getById(item.productId);
        return [
          new OrderItemPriceValidityRule(item, product),
          new OrderItemAmountValidityRule(item, product)
        ];
      })
    ]);
  }

  protected _onUpdateCommandInitialization(item: OrderItem, context: object): Promise<void> {
    stripAllFieldsFrom(item).except(['id', 'quantity', 'amount', 'price', 'productId', 'orderId']);
    convert(item, 'quantity').toFloat();
    convert(item, 'amount').toFloat();
    convert(item, 'price').toFloat();
    return Promise.resolve();
  }

  protected async _getRulesForUpdateCommand(item: OrderItem, context: object): Promise<IRule[]> {
    const productDataProxy = this.proxyFactory.productDataProxy;
    const orderItemDataProxy = this.dataProxy;
    return Promise.resolve([
      Rule.ifAllValid([
        new FieldRequiredRule('quantity', item),
        new FieldRequiredRule('amount', item),
        new FieldRequiredRule('price', item),
        new FieldRequiredRule('productId', item, 'product'),
      ])
      .thenGetRules(async () => {
        const savedItem = await orderItemDataProxy.getById(item.id);
        const product = await productDataProxy.getById(item.productId);
        return [
          new ValidOrderItemStatusForUpdateRule(savedItem)
            .ifValidThenValidate([
              new OrderItemPriceValidityRule(item, product),
              new OrderItemAmountValidityRule(item, product)
            ])
        ];
      })
    ]);
  }

  public getByOrderCommand(orderId: string): Command<OrderItem[]> {
    const service = this;
    return new Command<OrderItem[]>({
      _onValidationSuccess() {
        return service.proxyFactory.orderItemDataProxy.getByOrder(orderId);
      }
    });
  }

  public submitCommand(orderItemId: string): Command<OrderItem> {
    const service = this;
    return new Command<OrderItem>({
      _onValidationSuccess() {
        return service.proxyFactory.orderItemDataProxy.submit(orderItemId);
      }
    });
  }

  public shipCommand(orderItemId: string): Command<OrderItem> {
    const service = this;
    return new Command<OrderItem>({
      _onValidationSuccess() {
        return service.proxyFactory.orderItemDataProxy.ship(orderItemId);
      }
    });
  }

  public canDelete(item: OrderItem): boolean {
  return item.status !== 'SHIPPED';
  }

  public canSubmit(item: OrderItem): boolean {
    return item.status === 'PENDING';
  }

  public canShip(item: OrderItem): boolean {
  return item.status === 'SUBMITTED' || item.status === 'BACKORDERED';
  }

  public anySubmittable(orderItems: OrderItem[]): boolean {
    orderItems = orderItems || [];
    return orderItems.some(i => i.status === 'PENDING');
  }

}

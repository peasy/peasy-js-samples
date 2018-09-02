import {
  IOrderItemDataProxy,
  ICustomerDataProxy,
  ICategoryDataProxy,
  IInventoryDataProxy,
  IProductDataProxy,
  IOrderDataProxy
} from '../contracts';

import { CustomerDataProxy } from './http/customer-data-proxy';
import { CategoryDataProxy } from './http/category-data-proxy';
import { InventoryDataProxy } from './http/inventory-data-proxy';
import { ProductDataProxy } from './http/product-data-proxy';
import { OrderDataProxy } from './http/order-data-proxy';
import { OrderItemDataProxy } from './http/order-item-data-proxy';
import { Injectable } from '@angular/core';
import { CustomerCacheDataProxy } from './cache/customer-cache-data-proxy';
import { CategoryCacheDataProxy } from './cache/category-cache-data-proxy';
import { InventoryCacheDataProxy } from './cache/inventory-cache-data-proxy';
import { ProductCacheDataProxy } from './cache/product-cache-data-proxy';
import { OrderCacheDataProxy } from './cache/order-cache-data-proxy';
import { OrderItemCacheDataProxy } from './cache/order-item-cache-data-proxy';
import { CustomerEventAggregator } from '../event-aggregators/customer-event-aggregator';
import { CategoryEventAggregator } from '../event-aggregators/category-event-aggregator';
import { InventoryEventAggregator } from '../event-aggregators/inventory-event-aggregator';
import { ProductEventAggregator } from '../event-aggregators/product-event-aggregator';
import { OrderEventAggregator } from '../event-aggregators/order-event-aggregator';
import { OrderItemEventAggregator } from '../event-aggregators/order-item-event-aggregator';

@Injectable({ providedIn: 'root' })
export class DataProxyFactory {

  constructor(
    protected categoryEventAggregator: CategoryEventAggregator,
    protected customerEventAggregator: CustomerEventAggregator,
    protected inventoryEventAggregator: InventoryEventAggregator,
    protected producteEventAggregator: ProductEventAggregator,
    protected orderEventAggregator: OrderEventAggregator,
    protected orderItemEventAggregator: OrderItemEventAggregator
  ) {}

  get categoryDataProxy(): ICategoryDataProxy {
    return new CategoryCacheDataProxy(new CategoryDataProxy(), this.categoryEventAggregator);
  }

  get customerDataProxy(): ICustomerDataProxy {
    return new CustomerCacheDataProxy(new CustomerDataProxy(), this.customerEventAggregator);
  }

  get inventoryDataProxy(): IInventoryDataProxy {
    return new InventoryCacheDataProxy(new InventoryDataProxy(), this.inventoryEventAggregator);
  }

  get productDataProxy(): IProductDataProxy {
    return new ProductCacheDataProxy(new ProductDataProxy(), this.producteEventAggregator);
  }

  get orderDataProxy(): IOrderDataProxy {
    return new OrderCacheDataProxy(new OrderDataProxy(), this.orderEventAggregator);
  }

  get orderItemDataProxy(): IOrderItemDataProxy {
    return new OrderItemCacheDataProxy(new OrderItemDataProxy(), this.orderItemEventAggregator);
  }

}

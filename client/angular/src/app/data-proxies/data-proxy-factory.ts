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

  private _categoryDataProxy: ICategoryDataProxy;
  private _customerDataProxy: ICustomerDataProxy;
  private _inventoryDataProxy: IInventoryDataProxy;
  private _productDataProxy: IProductDataProxy;
  private _orderDataProxy: IOrderDataProxy;
  private _orderItemDataProxy: IOrderItemDataProxy;

  constructor(
    protected categoryEventAggregator: CategoryEventAggregator,
    protected customerEventAggregator: CustomerEventAggregator,
    protected inventoryEventAggregator: InventoryEventAggregator,
    protected producteEventAggregator: ProductEventAggregator,
    protected orderEventAggregator: OrderEventAggregator,
    protected orderItemEventAggregator: OrderItemEventAggregator
  ) {
    this._categoryDataProxy = new CategoryCacheDataProxy(new CategoryDataProxy(), this.categoryEventAggregator);
    this._customerDataProxy = new CustomerCacheDataProxy(new CustomerDataProxy(), this.customerEventAggregator);
    this._inventoryDataProxy = new InventoryCacheDataProxy(new InventoryDataProxy(), this.inventoryEventAggregator);
    this._productDataProxy = new ProductCacheDataProxy(new ProductDataProxy(), this.producteEventAggregator);
    this._orderDataProxy = new OrderCacheDataProxy(new OrderDataProxy(), this.orderEventAggregator);
    this._orderItemDataProxy = new OrderItemCacheDataProxy(new OrderItemDataProxy(), this.orderItemEventAggregator);
  }

  get categoryDataProxy(): ICategoryDataProxy {
    return this._categoryDataProxy;
  }

  get customerDataProxy(): ICustomerDataProxy {
    return this._customerDataProxy;
  }

  get inventoryDataProxy(): IInventoryDataProxy {
    return this._inventoryDataProxy;
  }

  get productDataProxy(): IProductDataProxy {
    return this._productDataProxy;
  }

  get orderDataProxy(): IOrderDataProxy {
    return this._orderDataProxy;
  }

  get orderItemDataProxy(): IOrderItemDataProxy {
    return this._orderItemDataProxy;
  }

}

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

@Injectable({ providedIn: 'root' })
export class DataProxyFactory {

  get customerDataProxy(): ICustomerDataProxy {
    return new CustomerCacheDataProxy(new CustomerDataProxy());
  }

  get categoryDataProxy(): ICategoryDataProxy {
    return new CategoryCacheDataProxy(new CategoryDataProxy());
  }

  get inventoryDataProxy(): IInventoryDataProxy {
    return new InventoryCacheDataProxy(new InventoryDataProxy());
  }

  get productDataProxy(): IProductDataProxy {
    return new ProductCacheDataProxy(new ProductDataProxy());
  }

  get orderDataProxy(): IOrderDataProxy {
    return new OrderCacheDataProxy(new OrderDataProxy());
  }

  get orderItemDataProxy(): IOrderItemDataProxy {
    return new OrderItemCacheDataProxy(new OrderItemDataProxy());
  }

}

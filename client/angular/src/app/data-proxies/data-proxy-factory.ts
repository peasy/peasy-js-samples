import { IDataProxy, Customer, Category, InventoryItem, Product, Order, OrderItem } from '../contracts';
import { CustomerDataProxy } from './http/customer-data-proxy';
import { CategoryDataProxy } from './http/category-data-proxy';
import { InventoryDataProxy } from './http/inventory-data-proxy';
import { ProductDataProxy } from './http/product-data-proxy';
import { OrderDataProxy } from './http/order-data-proxy';
import { OrderItemDataProxy } from './http/order-item-data-proxy';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataProxyFactory {

  get customerDataProxy(): IDataProxy<Customer> {
    return new CustomerDataProxy();
  }

  get categoryDataProxy(): IDataProxy<Category> {
    return new CategoryDataProxy();
  }

  get inventoryDataProxy(): IDataProxy<InventoryItem> {
    return new InventoryDataProxy();
  }

  get productDataProxy(): IDataProxy<Product> {
    return new ProductDataProxy();
  }

  get orderDataProxy(): IDataProxy<Order> {
    return new OrderDataProxy();
  }

  get orderItemDataProxy(): IDataProxy<OrderItem> {
    return new OrderItemDataProxy();
  }

}

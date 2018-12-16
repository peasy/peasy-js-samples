import { IDataProxy } from 'peasy-js';

export interface Entity {
  id: string;
}

export interface Customer extends Entity {
  name: string;
}

export interface Category extends Entity {
  name: string;
}

export interface Product extends Entity {
  name: string;
  price: number;
  categoryId: string;
}

export interface Order extends Entity {
  orderDate: Date;
  customerId: string;
}

export interface OrderItem extends Entity {
  quantity: number;
  amount: number;
  price: number;
  productId: string;
  orderId: string;
  status: string;
  submittedOn: Date;
  shippedOn: Date;
}

export interface InventoryItem extends Entity {
  quantityOnHand: number;
  productId: string;
  version: number;
}

export interface Error {
  association: string;
  message: string;
}

export interface ExecutionResult<T> {
  success: boolean;
  errors: Error[];
  value: T;
}

export interface ViewModelArgs<T> {
  entity?: T;
  entityID: string;
}

export interface INotificationMessenger {
  info(message: string): void;
  warning(message: string): void;
  error(message: string): void;
}

export interface IDataProxy<T extends Entity> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  insert(data: T): Promise<T>;
  update(data: T):  Promise<T>;
  destroy(id: string): Promise<void>;
}

export interface ICategoryDataProxy extends IDataProxy<Category, string> {
}

export interface ICustomerDataProxy extends IDataProxy<Customer, string> {
}

export interface IInventoryDataProxy extends IDataProxy<InventoryItem, string> {
  getByProduct(productId: string): Promise<InventoryItem>;
}

export interface IProductDataProxy extends IDataProxy<Product, string> {
  getByCategory(categoryId: string): Promise<Product[]>;
}

export interface IOrderDataProxy extends IDataProxy<Order, string> {
}

export interface IOrderItemDataProxy extends IDataProxy<OrderItem, string> {
  getByOrder(orderId: string): Promise<OrderItem[]>;
  submit(itemId: string): Promise<OrderItem>;
  ship(itemId: string): Promise<OrderItem>;
}

export interface ISubscription {
  unsubscribe();
}

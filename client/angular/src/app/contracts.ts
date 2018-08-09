import { ServiceBase } from './services/service-base';

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
  service: ServiceBase<T>;
  entity?: T;
  entityID: string;
}

export interface INotificationMessenger {
  info(message: string): void;
  warning(message: string): void;
  error(message: string): void;
}

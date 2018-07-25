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
  entity: T;
  entityID: string;
}

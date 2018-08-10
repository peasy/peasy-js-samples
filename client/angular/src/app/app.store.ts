import { Injectable } from '@angular/core';
import { Entity, Customer, Category, Order, InventoryItem, OrderItem, Product } from './contracts';

export class Store<T extends Entity> {

  constructor() { }

  protected _data: Map<string, T> = new Map<string, T>();

  public getAll(): T[] {
    return Array.from(this._data.values(), i => {
      return Object.assign({}, i);
    });
  }

  public getById(id: string): T {
    const data = this._data.get(id);
    if (data) {
      return Object.assign({}, data);
    }
    return null;
  }

  public insertBulk(data: T[]) {
    data.forEach(i => this._data.set(i.id, Object.assign({}, i)));
  }

  public insert(data: T): void {
    this._data.set(data.id, Object.assign({}, data));
    // insert into the store
    // raise insert event
    console.log('INSERT EVENT RAISED', data);
    console.log('DATA ...', this._data);
  }

  public destroy(id: string): void {
    this._data.delete(id);
    console.log('DELETE EVENT RAISED', id);
    console.log('DATA ...', this._data);
  }

  public update(data: T): void {
    this._data.set(data.id, Object.assign({}, data));
    // insert into the store
    // raise insert event
    console.log('UPDATE EVENT RAISED', data);
  }
}

@Injectable({ providedIn: 'root' })
export class CustomerStore extends Store<Customer> {
}

@Injectable({ providedIn: 'root' })
export class CategoryStore extends Store<Category> {
}

@Injectable({ providedIn: 'root' })
export class OrderStore extends Store<Order> {
}

@Injectable({ providedIn: 'root' })
export class OrderItemStore extends Store<OrderItem> {
}

@Injectable({ providedIn: 'root' })
export class InventoryStore extends Store<InventoryItem> {
}

@Injectable({ providedIn: 'root' })
export class ProductStore extends Store<Product> {
}

export class EventAggregator {
  public onCustomerChanged(func) {

  }
}

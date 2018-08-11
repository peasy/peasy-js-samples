import { Injectable } from '@angular/core';
import { Entity, Customer, Category, Order, InventoryItem, OrderItem, Product } from './contracts';
import { EventAggregator } from './event-aggregator';

@Injectable({ providedIn: 'root' })
export class Store<T extends Entity> {

  constructor(protected eventAggregator: EventAggregator<T>) { }

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
    this.eventAggregator.insert.publish(data);
  }

  public destroy(id: string): void {
    const data = this._data.get(id);
    this._data.delete(id);
    this.eventAggregator.delete.publish(data);
  }

  public update(data: T): void {
    this._data.set(data.id, Object.assign({}, data));
    this.eventAggregator.update.publish(data);
  }
}

// @Injectable({ providedIn: 'root' })
// export class EventEmitter {

//   private _functions = {};

//   public publish(data) {
//     Object.keys(this._functions).forEach(key => this._functions[key](data));
//   }

//   public subscribe(func): number {
//     const id = Object.keys(this._functions).length + 1;
//     this._functions[id] = func;
//     return id;
//   }

//   public unsubscribe(subscriptionId: number) {
//     delete this._functions[subscriptionId];
//   }
// }



@Injectable({ providedIn: 'root' })
export class CustomerStore extends Store<Customer> {
  constructor(protected eventAggregator: EventAggregator<Customer>) {
    super(eventAggregator);
  }
}

@Injectable({ providedIn: 'root' })
export class CategoryStore extends Store<Category> {
  constructor(protected eventAggregator: EventAggregator<Category>) {
    super(eventAggregator);
  }
}

@Injectable({ providedIn: 'root' })
export class OrderStore extends Store<Order> {
  constructor(protected eventAggregator: EventAggregator<Order>) {
    super(eventAggregator);
  }
}

@Injectable({ providedIn: 'root' })
export class OrderItemStore extends Store<OrderItem> {
  constructor(protected eventAggregator: EventAggregator<OrderItem>) {
    super(eventAggregator);
  }
}

@Injectable({ providedIn: 'root' })
export class InventoryStore extends Store<InventoryItem> {
  constructor(protected eventAggregator: EventAggregator<InventoryItem>) {
    super(eventAggregator);
  }
}

@Injectable({ providedIn: 'root' })
export class ProductStore extends Store<Product> {
  constructor(protected eventAggregator: EventAggregator<Product>) {
    super(eventAggregator);
  }
}

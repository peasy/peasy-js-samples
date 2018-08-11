import { Injectable } from '@angular/core';
import { EventEmitter } from 'src/app/event-emitter';

@Injectable({ providedIn: 'root' })
export class EventAggregator<T> {

  public insert: EventEmitter<T>;
  public update: EventEmitter<T>;
  public delete: EventEmitter<T>;

  constructor() {
    this.insert = new EventEmitter<T>();
    this.update = new EventEmitter<T>();
    this.delete = new EventEmitter<T>();
  }
}

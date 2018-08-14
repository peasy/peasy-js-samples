import { Injectable } from '@angular/core';
import { EventEmitter } from './event-emitter';
import { Entity } from '../contracts';

@Injectable({ providedIn: 'root' })
export class EventAggregator<T extends Entity> {

  public insert: EventEmitter<T>;
  public update: EventEmitter<T>;
  public delete: EventEmitter<T>;

  constructor() {
    this.insert = new EventEmitter<T>();
    this.update = new EventEmitter<T>();
    this.delete = new EventEmitter<T>();
  }
}

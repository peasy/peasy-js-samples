import { Injectable } from '@angular/core';
import { EventEmitter } from './event-emitter';
import { Entity } from '../contracts';

@Injectable({ providedIn: 'root' })
export class EventAggregator<T extends Entity> {

  public insert: EventEmitter<T>;
  public update: EventEmitter<T>;
  public delete: EventEmitter<T>;
  public remoteInsert: EventEmitter<T>;
  public remoteUpdate: EventEmitter<T>;
  public remoteDelete: EventEmitter<T>;

  constructor() {
    this.insert = new EventEmitter<T>();
    this.update = new EventEmitter<T>();
    this.delete = new EventEmitter<T>();
    this.remoteInsert = new EventEmitter<T>();
    this.remoteUpdate = new EventEmitter<T>();
    this.remoteDelete = new EventEmitter<T>();
  }
}

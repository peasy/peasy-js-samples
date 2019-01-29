import { ISubscription } from '../contracts';

export class EventEmitter<T> {

  private callbacks = [];

  public subscribe(callback): ISubscription {
    this.callbacks.push(callback);
    return {
      unsubscribe: () => {
        this.unsubscribe(callback);
      }
    } as ISubscription;
  }

  public unsubscribe(callback) {
    const index = this.callbacks.indexOf(callback);
    this.callbacks.splice(index, 1);
  }

  public publish(data: T) {
    this.callbacks.forEach(cb => cb(data));
  }

}

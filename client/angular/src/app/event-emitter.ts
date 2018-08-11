import { Subject } from '../../node_modules/rxjs';

export class EventEmitter<T> extends Subject<T> {
  constructor() {
    super();
  }

  public publish(data: T) {
    super.next(data);
  }

}

import { Rule } from 'peasy-js';
import { OrderItem } from '../contracts';

export class ValidOrderItemStatusForUpdateRule extends Rule {

  constructor(private orderItem: OrderItem) {
    super();
  }

  protected _onValidate(): Promise<void> {
    if (this.orderItem.status.toUpperCase() === 'BACKORDERED') {
      this._invalidate('Backordered items cannot be changed');
    } else if (this.orderItem.status.toUpperCase() === 'SHIPPED') {
      this._invalidate('Shipped items cannot be changed');
    }
    return Promise.resolve();
  }
}

import { Rule } from 'peasy-js';
import { OrderItem } from '../contracts';

export class CanSubmitOrderItemRule extends Rule {

  constructor(private orderItem: OrderItem) {
    super();
  }

  protected _onValidate(): Promise<void> {
    if (this.orderItem.status !== 'PENDING') {
      super._invalidate(`Order item ${this.orderItem.id} must be in a pending state to be submitted`);
    }
   return Promise.resolve();
  }
}

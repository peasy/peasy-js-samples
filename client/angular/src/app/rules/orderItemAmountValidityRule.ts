import { Rule } from 'peasy-js';
import { OrderItem, Product } from '../contracts';

export class OrderItemAmountValidityRule extends Rule {

  constructor(private orderItem: OrderItem, private product: Product) {
    super();
  }

  protected _onValidate(): Promise<void> {
    if (this.orderItem.amount !== this.product.price * this.orderItem.quantity) {
      this._invalidate(`The amount for the ${this.product.name} order item does
         not equal the quantity multiplied by the current price in our system`
      );
    }
    return Promise.resolve();
  }
}

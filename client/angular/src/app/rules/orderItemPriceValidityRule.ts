import { Rule } from 'peasy-js';
import { OrderItem, Product } from '../contracts';

export class OrderItemPriceValidityRule extends Rule {

  constructor(private orderItem: OrderItem, private product: Product) {
    super();
  }

  protected _onValidate(): Promise<void> {
    if (this.orderItem.price !== this.product.price) {
      this._invalidate(`The price for ${this.product.name} no longer reflects the current price in our system`);
    }
    return Promise.resolve();
  }
}

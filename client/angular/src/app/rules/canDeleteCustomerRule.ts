import { Rule } from 'peasy-js';
import { OrderService } from '../services/order.service';

export class CanDeleteCustomerRule extends Rule {

  constructor(private customerId: string, private orderService: OrderService) {
    super();
  }

  protected async _onValidate(): Promise<void> {
    const result = await this.orderService.getByCustomerCommand(this.customerId).execute();
    if (result.value && result.value.length > 0) {
      super._invalidate('This customer is associated with one or more orders and cannot be deleted');
    }
  }
}

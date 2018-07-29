import { ListViewModelBase } from '../../list-view-model-base';
import { Order } from '../../contracts';
import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../services/customer.service';
import { CustomerListViewModel } from '../../customer/customer-list/customer-list-viewmodel';
import { OrderItemListViewModel } from '../../order-item/order-item-list/order-item-list-viewmodel';
import { OrderItemService } from '../../services/order-item.service';
import { ProductService } from '../../services/product.service';

export class OrderListViewModel extends ListViewModelBase<Order> {

  private _customersVM: CustomerListViewModel;
  private _orderItemsVM: OrderItemListViewModel;

  constructor(
    protected service: OrderService,
    private orderItemService: OrderItemService,
    private customerService: CustomerService,
    private productService: ProductService) {
      super(service);
      this._customersVM = new CustomerListViewModel(customerService);
      this._orderItemsVM = new OrderItemListViewModel(orderItemService, productService);
  }

  getCustomerNameFor(customerId: string): string {
    const customers = this._customersVM.data;
    if (customers) {
      return customers.find(c => c.id === customerId).name;
    }
    return null;
  }

  getStatusFor(orderId: string): string {
    const allOrderItems = this._orderItemsVM.data;
    if (allOrderItems) {
      const orderItems = allOrderItems.filter(i => i.orderId === orderId);
      return this.service.getStatusFor(orderItems);
    }
    return null;
  }

  getTotalFor(orderId: string): number {
    const allOrderItems = this._orderItemsVM.data;
    if (allOrderItems) {
      return allOrderItems.filter(i => i.orderId === orderId)
        .map(i => i.amount)
        .reduce((a, b) => a + b, 0);
    }
    return null;
  }
}


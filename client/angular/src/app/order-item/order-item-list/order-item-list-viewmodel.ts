import { ListViewModelBase } from '../../list-view-model-base';
import { OrderItem } from '../../contracts';
import { OrderItemService } from '../../services/order-item.service';
import { ProductListViewModel } from '../../product/product-list/product-list-viewmodel';
import { ProductService } from '../../services/product.service';

export class OrderItemListViewModel extends ListViewModelBase<OrderItem> {

  private _orderItems: OrderItem[];
  private _productsVM: ProductListViewModel;

  constructor(
    protected service: OrderItemService,
    private productService: ProductService,
    orderItems: OrderItem[] = []) {
      super(service);
      this._orderItems = orderItems;
      this.data = [...orderItems];
      this._productsVM = new ProductListViewModel(productService);
  }

  getProductNameFor(productId: string): string {
    const products = this._productsVM.data;
    if (products) {
      return products.find(p => p.id === productId).name;
    }
    return null;
  }
}


import { ListViewModelBase } from '../../list-view-model-base';
import { OrderItem } from '../../contracts';
import { OrderItemService } from '../../services/order-item.service';
import { ProductListViewModel } from '../../product/product-list/product-list-viewmodel';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderItemListViewModel extends ListViewModelBase<OrderItem> {

  constructor(
    protected service: OrderItemService,
    private productsVM: ProductListViewModel) {
      super(service);
  }

  get isBusy() {
    return super['isBusy'] || this.productsVM.isBusy;
  }

  async loadDataFor(orderId: string) {
    super.handle(() => this.service.getByOrder(orderId));
    this.productsVM.loadData();
  }

  getProductNameFor(productId: string): string {
    const products = this.productsVM.data;
    if (products) {
      return products.find(p => p.id === productId).name;
    }
    return null;
  }
}


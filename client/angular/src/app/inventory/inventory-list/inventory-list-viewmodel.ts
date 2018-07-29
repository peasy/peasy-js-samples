import { ListViewModelBase } from '../../list-view-model-base';
import { InventoryItem } from '../../contracts';
import { InventoryService } from '../../services/inventory.service';
import { ProductListViewModel } from '../../product/product-list/product-list-viewmodel';
import { Injectable } from '../../../../node_modules/@angular/core';

@Injectable({ providedIn: 'root' })
export class InventoryListViewModel extends ListViewModelBase<InventoryItem> {

  constructor(protected service: InventoryService, private productListVM: ProductListViewModel) {
    super(service);
  }

  get isBusy() {
    return super['isBusy'] || this.productListVM.isBusy;
  }

  loadData() {
    super.loadData();
    this.productListVM.loadData();
  }

  getProductNameFor(productId: string): string {
    const products = this.productListVM.data;
    if (products) {
      return products.find(p => p.id === productId).name;
    }
    return null;
  }
}

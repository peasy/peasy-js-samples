import { ListViewModelBase } from '../../list-view-model-base';
import { InventoryItem } from '../../contracts';
import { InventoryService } from '../../services/inventory.service';
import { ProductListViewModel } from '../../product/product-list/product-list-viewmodel';
import { Injectable } from '@angular/core';
import { InventoryEventAggregator } from '../../event-aggregators/inventory-event-aggregator';

@Injectable({ providedIn: 'root' })
export class InventoryListViewModel extends ListViewModelBase<InventoryItem> {

  constructor(
    protected service: InventoryService,
    private productListVM: ProductListViewModel,
    private inventoryEventAggregator: InventoryEventAggregator) {
    super(service);
    inventoryEventAggregator.insert.subscribe(() => this.loadData());
    inventoryEventAggregator.update.subscribe(() => this.loadData());
    inventoryEventAggregator.delete.subscribe(() => this.loadData());
  }

  get isBusy() {
    return super['isBusy'] || this.productListVM.isBusy;
  }

  async loadData(): Promise<boolean> {
    const results = await Promise.all([
      super.loadData(),
      this.productListVM.loadData()
    ]);
    return results.every(r => r === true);
  }

  getProductNameFor(productId: string): string {
    const products = this.productListVM.data;
    if (products) {
      return products.find(p => p.id === productId).name;
    }
    return null;
  }
}

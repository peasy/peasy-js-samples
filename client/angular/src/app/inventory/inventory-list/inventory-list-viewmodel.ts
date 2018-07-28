import { ListViewModelBase } from '../../list-view-model-base';
import { InventoryItem } from '../../contracts';
import { InventoryService } from '../../services/inventory.service';
import { ProductService } from '../../services/product.service';
import { ProductListViewModel } from '../../product/product-list/product-list-viewmodel';

export class InventoryListViewModel extends ListViewModelBase<InventoryItem> {

  private _productsVM: ProductListViewModel;

  constructor(protected service: InventoryService, private productService: ProductService) {
    super(service);
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

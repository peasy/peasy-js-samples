import { EntityViewModelBase } from '../../entity-view-model-base';
import { ViewModelArgs, InventoryItem } from '../../contracts';
import { ProductService } from '../../services/product.service';
import { ProductListViewModel } from '../../product/product-list/product-list-viewmodel';

export class InventoryDetailViewModel extends EntityViewModelBase<InventoryItem> {

  private _productsVM: ProductListViewModel;
  private _productName: string;

  constructor(args: ViewModelArgs<InventoryItem>, private productService: ProductService) {
    super(args);
    this._productsVM = new ProductListViewModel(productService);
  }

  get isBusy() {
    return super['isBusy'] || this._productsVM.isBusy;
  }

  get quantityOnHand(): number {
    return this.CurrentEntity.quantityOnHand;
  }

  set quantityOnHand(amount: number) {
    this.CurrentEntity.quantityOnHand = amount;
    this._isDirty = true;
  }

  get name(): string {
    const products = this._productsVM.data;
    if (!this._productName) {
      if (products) {
        this._productName = products.find(p => p.id === this.CurrentEntity.productId).name;
      }
    }
    return this._productName;
  }

}

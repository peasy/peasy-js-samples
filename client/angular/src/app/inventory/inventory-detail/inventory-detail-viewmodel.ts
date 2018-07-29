import { EntityViewModelBase } from '../../entity-view-model-base';
import { ViewModelArgs, InventoryItem } from '../../contracts';
import { ProductService } from '../../services/product.service';
import { ProductListViewModel } from '../../product/product-list/product-list-viewmodel';
import { InventoryListViewModel } from '../inventory-list/inventory-list-viewmodel';
import { InventoryService } from '../../services/inventory.service';

export class InventoryDetailViewModel extends EntityViewModelBase<InventoryItem> {

  private _productName: string;

  constructor(service: InventoryService, private productsVM: ProductListViewModel) {
    super(service);
  }

  loadData(args: ViewModelArgs<InventoryItem>): any {
    super.loadData(args);
    this.productsVM.loadData();
  }

  get isBusy() {
    return super['isBusy'] || this.productsVM.isBusy;
  }

  get quantityOnHand(): number {
    return this.CurrentEntity.quantityOnHand;
  }

  set quantityOnHand(amount: number) {
    this.CurrentEntity.quantityOnHand = amount;
    this._isDirty = true;
  }

  get name(): string {
    const products = this.productsVM.data;
    if (!this._productName) {
      if (products) {
        this._productName = products.find(p => p.id === this.CurrentEntity.productId).name;
      }
    }
    return this._productName;
  }

}

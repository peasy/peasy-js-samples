import { EntityViewModelBase } from '../../entity-view-model-base';
import { Product, ViewModelArgs, Category, OrderItem, InventoryItem } from '../../contracts';
import { CategoryListViewModel } from '../../category/category-list/category-list-viewmodel';
import { Injectable } from '@angular/core';
import { OrderItemService } from '../../services/order-item.service';
import { ProductListViewModel } from '../../product/product-list/product-list-viewmodel';
import { InventoryListViewModel } from '../../inventory/inventory-list/inventory-list-viewmodel';

@Injectable({ providedIn: 'root' })
export class OrderItemDetailViewModel extends EntityViewModelBase<OrderItem> {

  private _currentCategoryId: string;
  private _currentProduct: Product;
  private _currentInventory: InventoryItem;

  constructor(
    orderItemService: OrderItemService,
    private productListVM: ProductListViewModel,
    private categoryListVM: CategoryListViewModel,
    private inventoryItemListVM: InventoryListViewModel) {
    super(orderItemService);
  }

  loadData(args: ViewModelArgs<OrderItem>): any {
    super.loadData(args);
    this.categoryListVM.loadData();
    this.productListVM.loadData();
    this.inventoryItemListVM.loadData();
  }

  get isBusy() {
    return super['isBusy'] ||
      this.productListVM.isBusy ||
      this.categoryListVM.isBusy ||
      this.inventoryItemListVM.isBusy;
  }

  set orderId(value: string) {
    this.CurrentEntity.orderId = value;
  }

  get inStock(): number {
    return this._currentInventory ? this._currentInventory.quantityOnHand : 0;
  }

  get price(): number {
    return this._currentProduct ? this._currentProduct.price : 0;
  }

  get quantity(): number {
    return this.CurrentEntity.quantity;
  }

  // Show how middle tier will correctly parse the input into a number and error if fails
  set quantity(value: number) {
    this.CurrentEntity.quantity = value;
    this.CurrentEntity.amount = this.amount;
    this._isDirty = true;
  }

  get amount(): number {
    const price = this._currentProduct ? this._currentProduct.price : 0;
    const quantity = this.CurrentEntity.quantity ? this.CurrentEntity.quantity : 0;
    return price * quantity;
  }

  // get categoryId(): string {
  //   return this.CurrentEntity.categoryId;
  // }

  set categoryId(value: string) {
    this._currentCategoryId = value;
    this._currentProduct = null;
    this._currentInventory = null;
    this.CurrentEntity.orderId = this.orderId;
  }

  get productId(): string {
    return this.CurrentEntity.productId;
  }

  set productId(value: string) {
    this._currentInventory = this.inventoryItemListVM.data.find(i => i.productId === value);
    this._currentProduct = this.productListVM.data.find(i => i.id === value);
    this.CurrentEntity.productId = value;
    this.CurrentEntity.price = this._currentProduct.price;
    this.CurrentEntity.amount = this.amount;
    this._isDirty = true;
  }

  get categories(): Category[] {
    const defaultItem = { name: 'Select Category ...', id: null } as Category;
    if (this.categoryListVM.data) {
      return [defaultItem, ...this.categoryListVM.data];
    }
    return [defaultItem];
  }

  get products(): Product[] {
    const defaultItem = { name: 'Select Product ...', id: null } as Product;
    if (this._currentCategoryId) {
      return [defaultItem, ...this.productListVM.data.filter(p => p.categoryId === this._currentCategoryId)];
    }
    return [defaultItem, ...this.productListVM.data];
  }
}

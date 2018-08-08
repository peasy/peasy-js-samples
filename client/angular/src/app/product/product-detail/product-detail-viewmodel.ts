import { EntityViewModelBase } from '../../entity-view-model-base';
import { Product, ViewModelArgs, Category } from '../../contracts';
import { CategoryListViewModel } from '../../category/category-list/category-list-viewmodel';
import { ProductService } from '../../services/product.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductDetailViewModel extends EntityViewModelBase<Product> {

  constructor(productService: ProductService, private categoryListVM: CategoryListViewModel) {
    super(productService);
  }

  loadData(args: ViewModelArgs<Product>): any {
    super.loadData(args);
    this.categoryListVM.loadData();
  }

  get isBusy() {
    return super['isBusy'] || this.categoryListVM.isBusy;
  }

  get name(): string {
    return this.CurrentEntity.name;
  }

  set name(value: string) {
    this.CurrentEntity.name = value;
    this._isDirty = true;
  }

  get price(): number {
    return this.CurrentEntity.price;
  }

  set price(value: number) {
    this.CurrentEntity.price = value;
    this._isDirty = true;
  }

  get categoryId(): string {
    return this.CurrentEntity.categoryId || '';
  }

  set categoryId(value: string) {
    this.CurrentEntity.categoryId = value;
    this._isDirty = true;
  }

  get categories(): Category[] {
    const defaultItem = { name: 'Select Category ...', id: '' } as Category;
    return [defaultItem, ...this.categoryListVM.data];
  }

}

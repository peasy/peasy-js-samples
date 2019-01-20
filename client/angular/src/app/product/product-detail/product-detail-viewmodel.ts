import { EntityViewModelBase } from '../../entity-view-model-base';
import { Product, ViewModelArgs, Category } from '../../contracts';
import { CategoryListViewModel } from '../../category/category-list/category-list-viewmodel';
import { ProductService } from '../../services/product.service';
import { Injectable } from '@angular/core';
import { _getComponentHostLElementNode } from '@angular/core/src/render3/instructions';

@Injectable({ providedIn: 'root' })
export class ProductDetailViewModel extends EntityViewModelBase<Product> {

  constructor(productService: ProductService, private categoryListVM: CategoryListViewModel) {
    super(productService);
  }

  async loadData(args: ViewModelArgs<Product>): Promise<any> {
    await super.loadData(args);
    this.categoryListVM.loadData();
    this.validate();
  }

  get isBusy() {
    return super['isBusy'] || this.categoryListVM.isBusy;
  }

  get name(): string {
    return this.CurrentEntity.name;
  }

  set name(value: string) {
    this.setValue('name', value);
  }

  get price(): number {
    return this.CurrentEntity.price;
  }

  set price(value: number) {
    this.setValue('price', value);
  }

  get categoryId(): string {
    return this.CurrentEntity.categoryId || '';
  }

  set categoryId(value: string) {
    this.setValue('categoryId', value);
  }

  get categories(): Category[] {
    const defaultItem = { name: 'Select Category ...', id: '' } as Category;
    return [defaultItem, ...this.categoryListVM.data];
  }
}

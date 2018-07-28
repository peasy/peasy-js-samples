import { EntityViewModelBase } from '../../entity-view-model-base';
import { Product, ViewModelArgs, Category } from '../../contracts';
import { CategoryService } from '../../services/category.service';
import { CategoryListViewModel } from '../../category/category-list/category-list-viewmodel';

export class ProductDetailViewModel extends EntityViewModelBase<Product> {

  private _categoriesVM: CategoryListViewModel;

  constructor(args: ViewModelArgs<Product>, private categoryService: CategoryService) {
    super(args);
    this._categoriesVM = new CategoryListViewModel(categoryService);
  }

  get isBusy() {
    return super['isBusy'] || this._categoriesVM.isBusy;
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
    return this.CurrentEntity.categoryId;
  }

  set categoryId(value: string) {
    this.CurrentEntity.categoryId = value;
    this._isDirty = true;
  }

  get categories(): Category[] {
    return this._categoriesVM.data;
  }

}

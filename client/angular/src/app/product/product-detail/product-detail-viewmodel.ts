import { EntityViewModelBase } from '../../entity-view-model-base';
import { Product, ViewModelArgs } from '../../contracts';

export class ProductDetailViewModel extends EntityViewModelBase<Product> {

  constructor(args: ViewModelArgs<Product>) {
    super(args);
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
}

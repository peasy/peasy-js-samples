import { ViewModelBase } from '../../view-model-base';
import { Category } from '../../contracts';

export class CategoryDetailViewModel extends ViewModelBase<Category> {

  constructor(protected service, protected categoryId: string = null) {
    super(service, categoryId);
  }

  get name(): string {
    return this.CurrentEntity.name;
  }

  set name(value: string) {
    this.CurrentEntity.name = value;
    this._isDirty = true;
  }
}

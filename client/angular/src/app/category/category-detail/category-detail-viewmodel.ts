import { Category, ViewModelArgs } from '../../contracts';
import { EntityViewModelBase } from '../../entity-view-model-base';

export class CategoryDetailViewModel extends EntityViewModelBase<Category> {

  constructor(args: ViewModelArgs<Category>) {
    super(args);
  }

  get name(): string {
    return this.CurrentEntity.name;
  }

  set name(value: string) {
    this.CurrentEntity.name = value;
    this._isDirty = true;
  }
}

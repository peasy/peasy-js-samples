import { Category } from '../../contracts';
import { EntityViewModelBase } from '../../entity-view-model-base';
import { CategoryService } from '../../services/category.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryDetailViewModel extends EntityViewModelBase<Category> {

  constructor(service: CategoryService) {
    super(service);
  }

  get name(): string {
    return this.CurrentEntity.name;
  }

  set name(value: string) {
    this.CurrentEntity.name = value;
    this._isDirty = true;
  }
}

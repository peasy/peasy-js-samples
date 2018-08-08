import { Category } from '../../contracts';
import { ListViewModelBase } from '../../list-view-model-base';
import { CategoryService } from '../../services/category.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryListViewModel extends ListViewModelBase<Category> {
  constructor(protected service: CategoryService) {
    super(service);
  }
}

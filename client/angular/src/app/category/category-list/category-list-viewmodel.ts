import { Category } from '../../contracts';
import { ListViewModelBase } from '../../list-view-model-base';
import { CategoryService } from '../../services/category.service';
import { Injectable } from '@angular/core';
import { CategoryEventAggregator } from '../../event-aggregators/category-event-aggregator';

@Injectable({ providedIn: 'root' })
export class CategoryListViewModel extends ListViewModelBase<Category> {
  constructor(protected service: CategoryService, categoryEventAggregator: CategoryEventAggregator) {
    super(service);
    categoryEventAggregator.insert.subscribe(() => this.loadData());
    categoryEventAggregator.update.subscribe(() => this.loadData());
    categoryEventAggregator.delete.subscribe(() => this.loadData());
  }
}

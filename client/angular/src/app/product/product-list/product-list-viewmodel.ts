import { ListViewModelBase } from '../../list-view-model-base';
import { Product } from '../../contracts';
import { ProductService } from '../../services/product.service';
import { Injectable } from '@angular/core';
import { ProductEventAggregator } from '../../event-aggregators/product-event-aggregator';

@Injectable({ providedIn: 'root' })
export class ProductListViewModel extends ListViewModelBase<Product> {
  constructor(protected service: ProductService, productEventAggregator: ProductEventAggregator) {
    super(service);
    productEventAggregator.insert.subscribe(() => this.loadData());
    productEventAggregator.update.subscribe(() => this.loadData());
    productEventAggregator.delete.subscribe(() => this.loadData());
  }
}

import { ListViewModelBase } from '../../list-view-model-base';
import { Product } from '../../contracts';
import { ProductService } from '../../services/product.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductListViewModel extends ListViewModelBase<Product> {
  constructor(protected service: ProductService) {
    super(service);
  }
}

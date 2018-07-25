import { ListViewModelBase } from '../../list-view-model-base';
import { Product } from '../../contracts';
import { ProductService } from '../../services/product.service';

export class ProductListViewModel extends ListViewModelBase<Product> {
  constructor(protected service: ProductService) {
    super(service);
  }
}

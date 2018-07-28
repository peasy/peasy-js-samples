import { OnInit, Component } from '@angular/core';
import { ProductListViewModel } from './product-list-viewmodel';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public viewModel: ProductListViewModel;

  constructor(private productService: ProductService) {
  }

  public async ngOnInit() {
    this.viewModel = new ProductListViewModel(this.productService);
  }

  public async destroy(id: string): Promise<void> {
    await this.viewModel.destroy(id);
  }
}

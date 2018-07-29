import { OnInit, Component } from '@angular/core';
import { ProductListViewModel } from './product-list-viewmodel';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public viewModel: ProductListViewModel;

  constructor(vm: ProductListViewModel) {
    this.viewModel = vm;
  }

  public async ngOnInit() {
    this.viewModel.loadData();
  }

  public async destroy(id: string): Promise<void> {
    await this.viewModel.destroy(id);
  }
}

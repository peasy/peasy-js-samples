import { OnInit, Component } from '@angular/core';
import { ProductListViewModel } from './product-list-viewmodel';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private viewModel: ProductListViewModel) {
  }

  public ngOnInit(): void {
    this.viewModel.loadData();
  }
}

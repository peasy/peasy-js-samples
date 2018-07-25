import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryListViewModel } from './category-list-viewmodel';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public viewModel: CategoryListViewModel;

  constructor(private customerService: CategoryService) {
  }

  public async ngOnInit() {
    this.viewModel = new CategoryListViewModel(this.customerService);
  }

  public async destroy(id: string): Promise<void> {
    await this.viewModel.destroy(id);
  }
}

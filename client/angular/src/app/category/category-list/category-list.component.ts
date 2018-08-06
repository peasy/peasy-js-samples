import { Component, OnInit } from '@angular/core';
import { CategoryListViewModel } from './category-list-viewmodel';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public viewModel: CategoryListViewModel;

  constructor(vm: CategoryListViewModel) {
    this.viewModel = vm;
  }

  public async ngOnInit() {
    this.viewModel.loadData();
  }
}

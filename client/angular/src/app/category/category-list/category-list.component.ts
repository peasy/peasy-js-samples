import { Component, OnInit } from '@angular/core';
import { Category } from '../../contracts';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public categories: Category[];

  constructor(private categoryService: CategoryService) {
  }

  public async ngOnInit() {
    const result = await this.categoryService.getAll();
    this.categories = result.value;
  }

}

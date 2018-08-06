import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryDetailViewModel } from './category-detail-viewmodel';
import { Category, ViewModelArgs } from '../../contracts';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public viewModel: CategoryDetailViewModel) { }

  public async ngOnInit(): Promise<void> {
    let categoryId = this.route.snapshot.params['id'];
    if (categoryId.toLowerCase() === 'new') { categoryId = null; }
    this.viewModel.loadData({
      entityID: categoryId
    } as ViewModelArgs<Category>);
  }

  public goBack(): void {
    this.location.back();
  }

  public async save(): Promise<void> {
    if (await this.viewModel.save()) {
      this.goBack();
    }
  }
}

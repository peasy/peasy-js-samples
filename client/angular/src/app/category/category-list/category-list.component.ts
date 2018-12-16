import { Component, OnInit } from '@angular/core';
import { CategoryListViewModel } from './category-list-viewmodel';
import { NotificationMessenger } from 'src/app/notification-messenger';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public viewModel: CategoryListViewModel;

  constructor(vm: CategoryListViewModel,
    private notificationMessenger: NotificationMessenger) {
    this.viewModel = vm;
  }

  public async ngOnInit() {
    this.viewModel.loadData();
  }

  public async destroy(id: string): Promise<void> {
    if (!await this.viewModel.destroy(id)) {
      this.notificationMessenger.error(this.viewModel.errors[0]);
    }
  }
}

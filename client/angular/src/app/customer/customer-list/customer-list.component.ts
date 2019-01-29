import { Component, OnInit } from '@angular/core';
import { CustomerListViewModel } from './customer-list-viewmodel';
import { NotificationMessenger } from 'src/app/notification-messenger';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public viewModel: CustomerListViewModel;

  constructor(vm: CustomerListViewModel,
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

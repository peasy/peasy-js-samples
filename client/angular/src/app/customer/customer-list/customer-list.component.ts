import { Component, OnInit } from '@angular/core';
import { CustomerListViewModel } from './customer-list-viewmodel';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public viewModel: CustomerListViewModel;

  constructor(vm: CustomerListViewModel) {
    this.viewModel = vm;
  }

  public async ngOnInit() {
    this.viewModel.loadData();
  }
}

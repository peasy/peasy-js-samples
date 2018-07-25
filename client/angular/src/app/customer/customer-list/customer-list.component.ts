import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CustomerListViewModel } from './customer-list-viewmodel';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public viewModel: CustomerListViewModel;

  constructor(private customerService: CustomerService) {
  }

  public async ngOnInit() {
    this.viewModel = new CustomerListViewModel(this.customerService);
  }

  public async destroy(id: string): Promise<void> {
    await this.viewModel.destroy(id);
  }
}

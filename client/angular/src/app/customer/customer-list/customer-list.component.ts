import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../contracts';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public customers: Customer[];

  constructor(private customerService: CustomerService) {
  }

  public async ngOnInit() {
    const result = await this.customerService.getAll();
    this.customers = result.value;
  }
}
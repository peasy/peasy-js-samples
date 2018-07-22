import { Component, OnInit } from '@angular/core';
import { Customer } from '../../customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  currentCustomer: Customer;
  customers: Customer[];

  constructor(private customerService: CustomerService) {
  }

  // async ngOnInit() {
  //   console.log('made it');
  //   this.customers = await this.customerService.getAll();
  //   this.currentCustomer = this.customers[0];
  // }

  ngOnInit() {
    console.log('made it');
    this.customerService.getAll().then(results => {
      this.customers = results;
      this.currentCustomer = this.customers[0];
    });
  }

  customerClicked(customer: Customer): void {
    this.currentCustomer = customer;
  }

}

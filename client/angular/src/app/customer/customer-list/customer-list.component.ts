import { Component, OnInit } from '@angular/core';
import { Customer } from '../../customer';
import { Customers } from '../../customers';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  currentCustomer: Customer;
  customers: Customer[];

  constructor() {
  }

  ngOnInit(): void {
    this.customers = Customers;
    this.currentCustomer = this.customers[0];
  }

  customerClicked(customer: Customer): void {
    this.currentCustomer = customer;
  }

}

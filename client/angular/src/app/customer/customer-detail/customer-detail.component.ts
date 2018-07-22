import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  constructor() { }

  @Input()
  selectedCustomer: Customer;

  ngOnInit() {
  }

}

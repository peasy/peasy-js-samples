import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../customer';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private customerService: CustomerService) { }

  @Input()
  selectedCustomer: Customer = new Customer();

  async ngOnInit(): Promise<void> {
    const customers = await this.customerService.getAll();
    this.selectedCustomer = customers.find(c => c.id === this.route.snapshot.paramMap.get('id'));
  }

  goBack(): void {
    this.location.back();
  }

}

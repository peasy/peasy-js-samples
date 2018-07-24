import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerDetailViewModel } from './customer-detail-viewmodel';
import { CustomerService } from '../../services/customer.service';

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

  public viewModel: CustomerDetailViewModel = new CustomerDetailViewModel(this.customerService);

  public async ngOnInit(): Promise<void> {
    let customerId = this.route.snapshot.params['id'];
    if (customerId.toLowerCase() === 'new') { customerId = null; }
    this.viewModel = new CustomerDetailViewModel(this.customerService, customerId);
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

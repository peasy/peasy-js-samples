import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerDetailViewModel } from './customer-detail-viewmodel';
import { CustomerService } from '../../services/customer.service';
import { Customer, ViewModelArgs } from '../../contracts';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public viewModel: CustomerDetailViewModel) { }

  public async ngOnInit(): Promise<void> {
    let customerId = this.route.snapshot.params['id'];
    if (customerId.toLowerCase() === 'new') { customerId = null; }
    this.viewModel.loadData({
      entityID: customerId
    } as ViewModelArgs<Customer>);
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

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Location } from '@angular/common';
import { CustomerDetailViewModel } from './customer-detail-viewmodel';
import ordersDotCom from '../../../../../businessLogic.js';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location) { }

  viewModel: CustomerDetailViewModel = new CustomerDetailViewModel(ordersDotCom.services.customerService);

  async ngOnInit(): Promise<void> {
    const customerId = this.route.snapshot.params['id'];
    this.viewModel = new CustomerDetailViewModel(ordersDotCom.services.customerService, customerId);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.viewModel.save();
  }

}

import { Component, OnInit } from '@angular/core';
import { CustomerDetailViewModel } from '../customer-detail/customer-detail-viewmodel';

@Component({
  selector: 'app-custtest',
  templateUrl: './custtest.component.html',
  styleUrls: ['./custtest.component.css']
})
export class CusttestComponent implements OnInit {

  constructor(public viewModel: CustomerDetailViewModel) {}

  ngOnInit() {
  }

}

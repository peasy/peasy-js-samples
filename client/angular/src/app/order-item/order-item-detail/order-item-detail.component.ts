import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { OrderItemDetailViewModel } from './order-item-detail-viewmodel';
import { ViewModelArgs, OrderItem } from '../../contracts';

@Component({
  selector: 'app-order-item-detail',
  templateUrl: './order-item-detail.component.html',
  styleUrls: ['./order-item-detail.component.css']
})
export class OrderItemDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public viewModel: OrderItemDetailViewModel) { }

  public async ngOnInit() {
    const orderId = this.route.snapshot.params['id'];
    let orderItemId = this.route.snapshot.params['itemid'];
    if (orderItemId.toLowerCase() === 'new') { orderItemId = null; }
    await this.viewModel.loadData({ entityID: orderItemId, } as ViewModelArgs<OrderItem>);
    console.log('ORDER ID', orderId);
    this.viewModel.orderId = orderId;
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

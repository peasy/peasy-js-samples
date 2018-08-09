import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderItemDetailViewModel } from './order-item-detail-viewmodel';
import { ViewModelArgs, OrderItem } from '../../contracts';
import { NotificationMessenger } from '../../notification-messenger';

@Component({
  selector: 'app-order-item-detail',
  templateUrl: './order-item-detail.component.html',
  styleUrls: ['./order-item-detail.component.css']
})
export class OrderItemDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public viewModel: OrderItemDetailViewModel,
    private notificationMessenger: NotificationMessenger) { }

  public async ngOnInit() {
    const orderId = this.route.snapshot.params['id'];
    let orderItemId = this.route.snapshot.params['itemid'];
    if (orderItemId.toLowerCase() === 'new') { orderItemId = null; }
    await this.viewModel.loadData({ entityID: orderItemId, } as ViewModelArgs<OrderItem>);
    this.viewModel.orderId = orderId;
  }

  public goBack(): void {
    this.location.back();
  }

  public async save(): Promise<void> {
    if (await this.viewModel.save()) {
      this.notificationMessenger.info('Save successful');
      this.goBack();
    } else {
      this.notificationMessenger.error('Save failed.  Please try again.');
    }
  }

}

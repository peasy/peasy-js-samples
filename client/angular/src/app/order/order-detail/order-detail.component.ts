import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ViewModelArgs, Order, ISubscription } from '../../contracts';
import { OrderDetailViewModel } from './order-detail-viewmodel';
import { NotificationMessenger } from '../../notification-messenger';
import { ComponentBase } from '../../component-base';
import { OrderItemEventAggregator } from '../../event-aggregators/order-item-event-aggregator';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  // providers: [OrderDetailViewModel, OrderItemListViewModel] // require own instance
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  private _subscriptions: ISubscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    protected viewModel: OrderDetailViewModel,
    private itemEvents: OrderItemEventAggregator,
    private notificationMessenger: NotificationMessenger) { }

  public async ngOnInit(): Promise<void> {
    this._subscriptions.push(this.itemEvents.insert.subscribe(i => this.viewModel.onOrderItemChanged(i)));
    this._subscriptions.push(this.itemEvents.update.subscribe(i => this.viewModel.onOrderItemChanged(i)));
    this._subscriptions.push(this.itemEvents.delete.subscribe(i => this.viewModel.onOrderItemChanged(i)));

    let orderId: string = this.route.snapshot.params['id'];
    if (orderId.toLowerCase() === 'new') { orderId = null; }
    this.viewModel.loadData({
      entityID: orderId
    } as ViewModelArgs<Order>);
  }

  public async ngOnDestroy(): Promise<void> {
    this._subscriptions.forEach(s => s.unsubscribe());
    this._subscriptions = [];
  }

  public goBack(): void {
    this.router.navigate(['orders']);
  }

  public async saveOrder(): Promise<void> {
    if (await this.viewModel.save()) {
      this.notificationMessenger.info('Save successful');
      this.location.go(`orders/${this.viewModel.id}`);
    } else {
      this.notificationMessenger.error('Save failed.  Please try again.');
    }
  }

}

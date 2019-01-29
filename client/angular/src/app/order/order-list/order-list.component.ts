import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderListViewModel } from './order-list-viewmodel';
import { OrderEventAggregator } from '../../event-aggregators/order-event-aggregator';
import { OrderItemEventAggregator } from '../../event-aggregators/order-item-event-aggregator';
import { ISubscription } from '../../contracts';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  // providers: [OrderItemListViewModel] // require own instance
})
export class OrderListComponent implements OnInit, OnDestroy {

  private _subscriptions: ISubscription[] = [];

  constructor(protected viewModel: OrderListViewModel,
    private orderEvents: OrderEventAggregator,
    private orderItemEvents: OrderItemEventAggregator) {
      this.loadData = this.loadData.bind(this);
  }

  private loadData() {
    this.viewModel.loadData();
  }

  public ngOnInit(): void {
    this._subscriptions.push(this.orderEvents.insert.subscribe(() => this.loadData()));
    this._subscriptions.push(this.orderEvents.delete.subscribe(() => this.loadData()));
    this._subscriptions.push(this.orderItemEvents.insert.subscribe((i) => this.loadData()));
    this._subscriptions.push(this.orderItemEvents.update.subscribe((i) => this.loadData()));
    this._subscriptions.push(this.orderItemEvents.delete.subscribe((i) => this.loadData()));
    this.loadData();
  }

  public async ngOnDestroy(): Promise<void> {
    this._subscriptions.forEach(s => s.unsubscribe());
    this._subscriptions = [];
  }

  public async destroy(id: string): Promise<void> {
    await this.viewModel.destroy(id);
  }
}

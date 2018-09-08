import { Component, OnInit } from '@angular/core';
import { OrderListViewModel } from './order-list-viewmodel';
import { OrderItemEventAggregator } from '../../event-aggregators/order-item-event-aggregator';
import { OrderEventAggregator } from '../../event-aggregators/order-event-aggregator';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(protected viewModel: OrderListViewModel) {
  }

  public ngOnInit(): void {
    this.viewModel.loadData();
  }

  public async destroy(id: string): Promise<void> {
    await this.viewModel.destroy(id);
  }
}

import { Component, OnInit } from '@angular/core';
import { OrderListViewModel } from './order-list-viewmodel';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(public viewModel: OrderListViewModel) {
  }

  public ngOnInit(): void {
    this.viewModel.loadData();
  }

  public async destroy(id: string): Promise<void> {
    await this.viewModel.destroy(id);
  }
}

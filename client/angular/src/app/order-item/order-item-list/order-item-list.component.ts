import { OnInit, Component, Input } from '@angular/core';
import { OrderItemListViewModel } from './order-item-list-viewmodel';

@Component({
  selector: 'app-order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.css']
})
export class OrderItemListComponent implements OnInit {

  @Input()
  public orderId: string;

  constructor(public viewModel: OrderItemListViewModel) {
  }

  public async ngOnInit() {
    if (this.orderId) {
      // this.viewModel.loadDataFor(this.orderId);
    }
  }

  public async destroy(id: string): Promise<void> {
    await this.viewModel.destroy(id);
  }
}

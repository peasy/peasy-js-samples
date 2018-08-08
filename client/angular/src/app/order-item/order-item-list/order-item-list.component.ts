import { OnInit, Component, Input, EventEmitter, Output } from '@angular/core';
import { OrderItemListViewModel } from './order-item-list-viewmodel';
import { OrderItem } from '../../contracts';

@Component({
  selector: 'app-order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.css']
})
export class OrderItemListComponent implements OnInit {

  @Input()
  public orderId: string;

  @Input()
  public viewModel: OrderItemListViewModel;

  @Output()
  destroyClicked = new EventEmitter<OrderItem>();

  public async ngOnInit() {
  }

  public onDestroyClicked(orderItem: OrderItem): void {
    this.destroyClicked.emit(orderItem);
  }
}

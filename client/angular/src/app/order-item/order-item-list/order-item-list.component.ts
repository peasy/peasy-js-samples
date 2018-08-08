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

  @Input()
  public viewModel: OrderItemListViewModel;

  public async ngOnInit() {
  }

  public onDestroyClicked(itemId: string) {
    console.log('DESTROY CLICKED', itemId);
  }
}

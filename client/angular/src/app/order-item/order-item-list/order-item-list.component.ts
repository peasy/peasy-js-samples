import { OnInit, Component, Input } from '@angular/core';
import { OrderItemListViewModel } from './order-item-list-viewmodel';
import { OrderItemService } from '../../services/order-item.service';
import { ProductService } from '../../services/product.service';
import { OrderItem } from '../../contracts';

@Component({
  selector: 'app-order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.css']
})
export class OrderItemListComponent implements OnInit {

  @Input()
  orderItems: OrderItem[];

  public viewModel: OrderItemListViewModel;

  constructor(private orderItemService: OrderItemService, private productService: ProductService) {
  }

  public async ngOnInit() {
    this.viewModel = new OrderItemListViewModel(this.orderItemService, this.productService, this.orderItems);
  }

  public async destroy(id: string): Promise<void> {
    await this.viewModel.destroy(id);
  }
}

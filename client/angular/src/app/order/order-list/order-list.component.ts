import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../services/customer.service';
import { OrderListViewModel } from './order-list-viewmodel';
import { OrderItemService } from '../../services/order-item.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  public viewModel: OrderListViewModel;

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private orderItemService: OrderItemService,
    private productService: ProductService) {
  }

  // TODO: inject the VM into constructor
  ngOnInit() {
    this.viewModel = new OrderListViewModel(
      this.orderService,
      this.orderItemService,
      this.customerService,
      this.productService
    );
    this.viewModel.loadData();
  }


}

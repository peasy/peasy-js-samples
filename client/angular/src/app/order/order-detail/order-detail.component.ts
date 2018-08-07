import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ViewModelArgs, Order } from '../../contracts';
import { OrderDetailViewModel } from './order-detail-viewmodel';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public viewModel: OrderDetailViewModel) { }

  public async ngOnInit(): Promise<void> {
    let orderId: string = this.route.snapshot.params['id'];
    if (orderId.toLowerCase() === 'new') { orderId = null; }
    this.viewModel.loadData({
      entityID: orderId
    } as ViewModelArgs<Order>);
  }

  public goBack(): void {
    this.router.navigate(['orders']);
  }

  async saveOrder() {
    const result = await this.viewModel.save();
    if (result) {
      this.location.go(`orders/${this.viewModel.id}`);
    }
  }

}

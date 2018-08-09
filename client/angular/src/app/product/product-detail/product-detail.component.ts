import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductDetailViewModel } from './product-detail-viewmodel';
import { Product, ViewModelArgs } from '../../contracts';
import { NotificationMessenger } from '../../notification-messenger';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public viewModel: ProductDetailViewModel,
    private notificationMessenger: NotificationMessenger) { }

  public async ngOnInit(): Promise<void> {
    let productId = this.route.snapshot.params['id'];
    if (productId.toLowerCase() === 'new') { productId = null; }
    this.viewModel.loadData({
      entityID: productId
    } as ViewModelArgs<Product>);
  }

  public goBack(): void {
    this.location.back();
  }

  public async save(): Promise<void> {
    if (await this.viewModel.save()) {
      this.notificationMessenger.info('Save successful');
      this.goBack();
    } else {
      this.notificationMessenger.error('Save failed.  Please try again.');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductDetailViewModel } from './product-detail-viewmodel';
import { Product, ViewModelArgs } from '../../contracts';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService) { }

  public viewModel: ProductDetailViewModel;

  public async ngOnInit(): Promise<void> {
    let productId = this.route.snapshot.params['id'];
    if (productId.toLowerCase() === 'new') { productId = null; }
    this.viewModel = new ProductDetailViewModel({
      service: this.productService,
      entityID: productId
    } as ViewModelArgs<Product>);
  }

  public goBack(): void {
    this.location.back();
  }

  public async save(): Promise<void> {
    if (await this.viewModel.save()) {
      this.goBack();
    }
  }

}

import { Injectable } from '@angular/core';
import { Product } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';
import { ProductStore } from '../stores/product-store';

@Injectable({ providedIn: 'root' })
export class ProductService extends ServiceBase<Product> {

  constructor(store: ProductStore) {
    super(store, ordersDotCom.services.productService);
  }

}

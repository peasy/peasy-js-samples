import { Injectable } from '@angular/core';
import { Product } from '../contracts';
import { ProductDataProxy } from '../data-proxies/http/product-data-proxy';
import { ServiceBase } from './service-base';

@Injectable({ providedIn: 'root' })
export class ProductService extends ServiceBase<Product> {

  constructor(dataProxy: ProductDataProxy) {
    super(dataProxy);
  }
}

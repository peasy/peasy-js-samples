import { Injectable } from '@angular/core';
import { Product } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';

@Injectable({ providedIn: 'root' })
export class ProductService extends ServiceBase<Product> {

  constructor() {
    super(ordersDotCom.services.productService);
  }

}

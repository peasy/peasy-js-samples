import { Injectable } from '@angular/core';
import { Product } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';
import { ProductStore } from '../stores/product-store';
import { ServiceBaseII } from './customer.service-II';
import { ProductDataProxy } from '../data-proxies/http/event-emitter';

@Injectable({ providedIn: 'root' })
export class ProductService extends ServiceBaseII<Product> {

  constructor(dataProxy: ProductDataProxy) {
    super(dataProxy);
  }
}

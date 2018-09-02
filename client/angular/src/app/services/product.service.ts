import { Injectable } from '@angular/core';
import { Product } from '../contracts';
import { ServiceBase } from './service-base';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';

@Injectable({ providedIn: 'root' })
export class ProductService extends ServiceBase<Product> {

  constructor(proxyFactory: DataProxyFactory) {
    super(proxyFactory.productDataProxy);
  }
}

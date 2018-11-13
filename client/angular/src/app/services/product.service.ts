import { Injectable } from '@angular/core';
import { Product } from '../contracts';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';
import { BusinessService, IDataProxy } from 'peasy-js';

@Injectable({ providedIn: 'root' })
export class ProductService extends BusinessService<Product, string> {

  constructor(proxyFactory: DataProxyFactory) {
    super(proxyFactory.productDataProxy as IDataProxy<Product, string>);
  }
}

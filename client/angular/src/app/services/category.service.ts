import { Injectable } from '@angular/core';
import { Category } from '../contracts';
import { BusinessService } from 'peasy-js';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BusinessService<Category, string> {

  constructor(proxyFactory: DataProxyFactory) {
    super(proxyFactory.categoryDataProxy);
  }
}

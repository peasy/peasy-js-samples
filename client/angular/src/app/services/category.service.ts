import { Injectable } from '@angular/core';
import { Category } from '../contracts';
import { ServiceBase } from './service-base';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';

@Injectable({ providedIn: 'root' })
export class CategoryService extends ServiceBase<Category> {

  constructor(proxyFactory: DataProxyFactory) {
    super(proxyFactory.categoryDataProxy);
  }
}

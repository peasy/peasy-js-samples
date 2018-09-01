import { Injectable } from '@angular/core';
import { Category } from '../contracts';
import { CategoryDataProxy } from '../data-proxies/http/category-data-proxy';
import { ServiceBase } from './service-base';

@Injectable({ providedIn: 'root' })
export class CategoryService extends ServiceBase<Category> {

  constructor(dataProxy: CategoryDataProxy) {
    super(dataProxy);
  }
}

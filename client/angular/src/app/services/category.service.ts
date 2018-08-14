import { Injectable } from '@angular/core';
import { Category } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';
import { CategoryStore } from '../stores/category-store';

@Injectable({ providedIn: 'root' })
export class CategoryService extends ServiceBase<Category> {

  constructor(store: CategoryStore) {
    super(store, ordersDotCom.services.categoryService);
  }

}

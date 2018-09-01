import { Injectable } from '@angular/core';
import { Category } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';
import { CategoryStore } from '../stores/category-store';
import { ServiceBaseII } from './customer.service-II';
import { CategoryDataProxy } from '../data-proxies/http/event-emitter';

@Injectable({ providedIn: 'root' })
export class CategoryService extends ServiceBaseII<Category> {

  constructor(dataProxy: CategoryDataProxy) {
    super(dataProxy);
  }
}

import { Injectable } from '@angular/core';
import { Category } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';

@Injectable({ providedIn: 'root' })
export class CategoryService extends ServiceBase<Category> {

  constructor() {
    super(ordersDotCom.services.categoryService);
   }

}

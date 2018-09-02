import { Injectable } from '@angular/core';
import { Category, ICategoryDataProxy } from '../../contracts';
import { CacheDataProxy } from './cache-data-proxy-base';

@Injectable({ providedIn: 'root' })
export class CategoryCacheDataProxy
  extends CacheDataProxy<Category>
  implements ICategoryDataProxy {

  constructor(protected dataProxy: ICategoryDataProxy) {
    super(dataProxy);
  }

}

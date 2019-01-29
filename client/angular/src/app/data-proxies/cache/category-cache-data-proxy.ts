import { Injectable } from '@angular/core';
import { Category, ICategoryDataProxy } from '../../contracts';
import { CacheDataProxy } from './cache-data-proxy-base';
import { CategoryEventAggregator } from '../../event-aggregators/category-event-aggregator';

@Injectable({ providedIn: 'root' })
export class CategoryCacheDataProxy
  extends CacheDataProxy<Category>
  implements ICategoryDataProxy {

  constructor(protected dataProxy: ICategoryDataProxy, protected eventAggregator: CategoryEventAggregator) {
    super(dataProxy, eventAggregator);
  }

}

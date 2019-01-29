import { Injectable } from '@angular/core';
import { Product, IProductDataProxy } from '../../contracts';
import { CacheDataProxy } from './cache-data-proxy-base';
import { ProductEventAggregator } from '../../event-aggregators/product-event-aggregator';

@Injectable({ providedIn: 'root' })
export class ProductCacheDataProxy
  extends CacheDataProxy<Product>
  implements IProductDataProxy {

  constructor(protected dataProxy: IProductDataProxy, protected eventAggreator: ProductEventAggregator) {
    super(dataProxy, eventAggreator);
  }

  public getByCategory(categoryId: string): Promise<Product[]> {
    return this.dataProxy.getByCategory(categoryId);
  }

}

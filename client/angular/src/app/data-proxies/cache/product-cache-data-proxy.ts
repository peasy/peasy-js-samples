import { Injectable } from '@angular/core';
import { Product, IProductDataProxy } from '../../contracts';
import { CacheDataProxy } from './cache-data-proxy-base';

@Injectable({ providedIn: 'root' })
export class ProductCacheDataProxy
  extends CacheDataProxy<Product>
  implements IProductDataProxy {

  constructor(protected dataProxy: IProductDataProxy) {
    super(dataProxy);
  }

}

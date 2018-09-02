import { Injectable } from '@angular/core';
import { IOrderDataProxy, Order } from '../../contracts';
import { CacheDataProxy } from './cache-data-proxy-base';

@Injectable({ providedIn: 'root' })
export class OrderCacheDataProxy
  extends CacheDataProxy<Order>
  implements IOrderDataProxy {

  constructor(protected dataProxy: IOrderDataProxy) {
    super(dataProxy);
  }

}

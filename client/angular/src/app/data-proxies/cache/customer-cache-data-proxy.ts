import { Injectable } from '@angular/core';
import { Customer, ICustomerDataProxy } from '../../contracts';
import { CacheDataProxy } from './cache-data-proxy-base';

@Injectable({ providedIn: 'root' })
export class CustomerCacheDataProxy
  extends CacheDataProxy<Customer>
  implements ICustomerDataProxy {

  constructor(protected dataProxy: ICustomerDataProxy) {
    super(dataProxy);
  }

}

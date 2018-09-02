import { Injectable } from '@angular/core';
import { Customer, ICustomerDataProxy } from '../../contracts';
import { CacheDataProxy } from './cache-data-proxy-base';
import { CustomerEventAggregator } from '../../event-aggregators/customer-event-aggregator';

@Injectable({ providedIn: 'root' })
export class CustomerCacheDataProxy
  extends CacheDataProxy<Customer>
  implements ICustomerDataProxy {

  constructor(protected dataProxy: ICustomerDataProxy, protected eventAggregator: CustomerEventAggregator) {
    super(dataProxy, eventAggregator);
  }

}

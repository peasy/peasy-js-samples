import { Injectable } from '@angular/core';
import { InventoryItem, IInventoryDataProxy } from '../../contracts';
import { CacheDataProxy } from './cache-data-proxy-base';
import { InventoryEventAggregator } from '../../event-aggregators/inventory-event-aggregator';

@Injectable({ providedIn: 'root' })
export class InventoryCacheDataProxy
  extends CacheDataProxy<InventoryItem>
  implements IInventoryDataProxy {

  constructor(protected dataProxy: IInventoryDataProxy, protected eventAggregator: InventoryEventAggregator) {
    super(dataProxy, eventAggregator);
  }
}

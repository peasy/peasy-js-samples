import { Injectable } from '@angular/core';
import { InventoryItem, IInventoryDataProxy } from '../../contracts';
import { CacheDataProxy } from './cache-data-proxy-base';

@Injectable({ providedIn: 'root' })
export class InventoryCacheDataProxy
  extends CacheDataProxy<InventoryItem>
  implements IInventoryDataProxy {

  constructor(protected dataProxy: IInventoryDataProxy) {
    super(dataProxy);
  }

}

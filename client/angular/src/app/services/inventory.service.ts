import { Injectable } from '@angular/core';
import { InventoryItem } from '../contracts';
import { BusinessService } from 'peasy-js';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';

@Injectable({ providedIn: 'root' })
export class InventoryService extends BusinessService<InventoryItem, string> {

  constructor(proxyFactory: DataProxyFactory) {
    super(proxyFactory.inventoryDataProxy);
  }
}


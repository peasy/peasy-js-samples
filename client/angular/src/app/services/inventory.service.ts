import { Injectable } from '@angular/core';
import { InventoryItem } from '../contracts';
import { ServiceBase } from './service-base';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';

@Injectable({ providedIn: 'root' })
export class InventoryService extends ServiceBase<InventoryItem> {

  constructor(proxyFactory: DataProxyFactory) {
    super(proxyFactory.inventoryDataProxy);
  }
}


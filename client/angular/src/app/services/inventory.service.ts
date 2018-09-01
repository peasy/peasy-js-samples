import { Injectable } from '@angular/core';
import { InventoryItem } from '../contracts';
import { InventoryDataProxy } from '../data-proxies/http/inventory-data-proxy';
import { ServiceBase } from './service-base';

@Injectable({ providedIn: 'root' })
export class InventoryService extends ServiceBase<InventoryItem> {

  constructor(dataProxy: InventoryDataProxy) {
    super(dataProxy);
  }
}


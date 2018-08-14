import { Injectable } from '@angular/core';
import { InventoryItem, OrderItem } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';
import { InventoryStore } from '../stores/inventory-store';

@Injectable({ providedIn: 'root' })
export class InventoryService extends ServiceBase<InventoryItem> {

  constructor(store: InventoryStore) {
    console.log('INV SERVICE!!', store);
    super(store, ordersDotCom.services.inventoryItemService);
  }

}

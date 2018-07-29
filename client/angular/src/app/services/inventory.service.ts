import { Injectable } from '@angular/core';
import { InventoryItem, OrderItem } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';

@Injectable({ providedIn: 'root' })
export class InventoryService extends ServiceBase<InventoryItem> {

  constructor() {
    super(ordersDotCom.services.inventoryItemService);
  }

}

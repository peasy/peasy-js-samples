import { Injectable } from '@angular/core';
import { InventoryItem, OrderItem } from '../contracts';
import ordersDotCom from '../../../../businessLogic.js';
import { ServiceBase } from './service-base';
import { InventoryStore } from '../stores/inventory-store';
import { ServiceBaseII } from './customer.service-II';
import { InventoryDataProxy } from '../data-proxies/http/event-emitter';

@Injectable({ providedIn: 'root' })
export class InventoryService extends ServiceBaseII<InventoryItem> {

  constructor(dataProxy: InventoryDataProxy) {
    super(dataProxy);
  }
}


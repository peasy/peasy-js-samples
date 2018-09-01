import { Injectable } from '@angular/core';
import { HttpDataProxy } from './http-data-proxy-base';
import { InventoryItem } from '../../contracts';

@Injectable({ providedIn: 'root' })
export class InventoryDataProxy extends HttpDataProxy<InventoryItem> {
  protected baseUri = '/inventoryitems';
}

import { Injectable } from '@angular/core';
import { HttpDataProxy } from './http-data-proxy-base';
import { InventoryItem, IInventoryDataProxy } from '../../contracts';
import axios from 'axios';

@Injectable({ providedIn: 'root' })
export class InventoryDataProxy
  extends HttpDataProxy<InventoryItem>
  implements IInventoryDataProxy {

  protected baseUri = '/inventoryitems';

  public getByProduct(productId: string): Promise<InventoryItem> {
    return axios.get(`${this.baseUri}?productid=${productId}`)
      .then(result => result.data);
  }

}

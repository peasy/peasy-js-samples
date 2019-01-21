import { Injectable } from '@angular/core';
import { InventoryItem } from '../contracts';
import { BusinessService, IRule } from 'peasy-js';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';
import { FieldRequiredRule } from '../rules/fieldRequiredRule';
import { FieldTypeRule } from '../rules/fieldTypeRule';

@Injectable({ providedIn: 'root' })
export class InventoryService extends BusinessService<InventoryItem, string> {

  constructor(proxyFactory: DataProxyFactory) {
    super(proxyFactory.inventoryDataProxy);
  }

  _getRulesForInsertCommand(item: InventoryItem, context: Object): Promise<IRule[]> {
    return Promise.resolve([
      new FieldRequiredRule('quantityOnHand', item, 'quantity')
        .ifValidThenValidate(new FieldTypeRule('quantityOnHand', item.quantityOnHand, 'number', 'quantity'))
    ]);
  }

  _getRulesForUpdateCommand(item: InventoryItem, context: Object): Promise<IRule[]> {
    return Promise.resolve([
      new FieldRequiredRule('quantityOnHand', item, 'quantity')
        .ifValidThenValidate(new FieldTypeRule('quantityOnHand', item.quantityOnHand, 'number', 'quantity'))
    ]);
  }

}


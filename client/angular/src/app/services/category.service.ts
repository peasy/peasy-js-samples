import { Injectable } from '@angular/core';
import { Category } from '../contracts';
import { BusinessService, IRule } from 'peasy-js';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';
import { stripAllFieldsFrom } from '../../../../../business_logic/shared/utils';
import { FieldRequiredRule } from '../rules/fieldRequiredRule';
import { CanDeleteCategoryRule } from '../rules/canDeleteCategoryRule';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BusinessService<Category, string> {

  constructor(proxyFactory: DataProxyFactory, private productService: ProductService) {
    super(proxyFactory.categoryDataProxy);
  }

  _onInsertCommandInitialization(category: Category, context: Object): Promise<void> {
    stripAllFieldsFrom(category).except(['name', 'parentid']);
    return Promise.resolve();
  }

  _getRulesForInsertCommand(category: Category, context: Object): Promise<IRule[]> {
    return Promise.resolve([
      new FieldRequiredRule('name', category)
    ]);
  }

  _onUpdateCommandInitialization(category: Category, context: Object): Promise<void> {
    stripAllFieldsFrom(category).except(['id', 'name', 'parentid']);
    return Promise.resolve();
  }

  _getRulesForUpdateCommand(category: Category, context: Object): Promise<IRule[]> {
    return Promise.resolve([
      new FieldRequiredRule('id', category),
      new FieldRequiredRule('name', category)
    ]);
  }

  _getRulesForDestroyCommand(id: string, context: Object): Promise<IRule[]> {
    return Promise.resolve([
      new CanDeleteCategoryRule(id, this.productService)
    ]);
  }

}

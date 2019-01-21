import { Injectable } from '@angular/core';
import { Product } from '../contracts';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';
import { BusinessService, IDataProxy, ICommand, Command, IRule } from 'peasy-js';
import { stripAllFieldsFrom } from '../../../../../business_logic/shared/utils';
import { FieldRequiredRule } from '../rules/fieldRequiredRule';
import { FieldLengthRule } from '../rules/fieldLengthRule';
import { FieldTypeRule } from '../rules/fieldTypeRule';

@Injectable({ providedIn: 'root' })
export class ProductService extends BusinessService<Product, string> {

  constructor(private proxyFactory: DataProxyFactory) {
    super(proxyFactory.productDataProxy as IDataProxy<Product, string>);
  }

  _onInsertCommandInitialization(product: Product, context: Object): Promise<void> {
    stripAllFieldsFrom(product).except(['name', 'description', 'price', 'categoryId']);
    return Promise.resolve();
  }

  _getRulesForInsertCommand(product: Product, context: Object): Promise<IRule[]> {
    return Promise.resolve([
      new FieldRequiredRule('name', product)
        .ifValidThenValidate(new FieldLengthRule('name', product.name, 50)),
      new FieldRequiredRule('price', product)
        .ifValidThenValidate(new FieldTypeRule('price', product.price, 'number')),
      new FieldRequiredRule('categoryId', product, 'category'),
    ]);
  }

  _onUpdateCommandInitialization(product: Product, context: Object): Promise<void> {
    stripAllFieldsFrom(product).except(['id', 'name', 'description', 'price', 'categoryId']);
    return Promise.resolve();
  }

  _getRulesForUpdateCommand(product: Product, context: Object): Promise<IRule[]> {
    return Promise.resolve([
      new FieldRequiredRule('name', product)
        .ifValidThenValidate(new FieldLengthRule('name', product.name, 50)),
      new FieldRequiredRule('price', product)
        .ifValidThenValidate(new FieldTypeRule('price', product.price, 'number')),
      new FieldRequiredRule('categoryId', product, 'category'),
    ]);
  }

  public getByCategoryCommand(categoryId: string): ICommand<Product[]> {
    return new Command<Product[]>({
      _onValidationSuccess: () => {
        return this.proxyFactory.productDataProxy.getByCategory(categoryId);
      }
    });
  }
}

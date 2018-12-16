import { Injectable } from '@angular/core';
import { Product } from '../contracts';
import { DataProxyFactory } from '../data-proxies/data-proxy-factory';
import { BusinessService, IDataProxy, ICommand, Command } from 'peasy-js';

@Injectable({ providedIn: 'root' })
export class ProductService extends BusinessService<Product, string> {

  constructor(private proxyFactory: DataProxyFactory) {
    super(proxyFactory.productDataProxy as IDataProxy<Product, string>);
  }

  public getByCategoryCommand(categoryId: string): ICommand<Product[]> {
    return new Command<Product[]>({
      _onValidationSuccess: () => {
        return this.proxyFactory.productDataProxy.getByCategory(categoryId);
      }
    });
  }
}

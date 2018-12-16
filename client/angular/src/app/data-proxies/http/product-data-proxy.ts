import { Injectable } from '@angular/core';
import { HttpDataProxy } from './http-data-proxy-base';
import { Product, IProductDataProxy } from '../../contracts';
import axios from 'axios';

@Injectable({ providedIn: 'root' })
export class ProductDataProxy extends HttpDataProxy<Product> implements IProductDataProxy {
  protected baseUri = '/products';

  getByCategory(categoryid: string): Promise<Product[]> {
    return this.getAllById(`${this.baseUri}?categoryid=${categoryid}`);
  }
}

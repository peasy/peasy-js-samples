import { Injectable } from '@angular/core';
import { HttpDataProxy } from './http-data-proxy-base';
import { Product } from '../../contracts';

@Injectable({ providedIn: 'root' })
export class ProductDataProxy extends HttpDataProxy<Product> {
  protected baseUri = '/products';
}

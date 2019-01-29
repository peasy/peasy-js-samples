import { Injectable } from '@angular/core';
import { HttpDataProxy } from './http-data-proxy-base';
import { Category } from '../../contracts';

@Injectable({ providedIn: 'root' })
export class CategoryDataProxy extends HttpDataProxy<Category> {
  protected baseUri = '/categories';
}

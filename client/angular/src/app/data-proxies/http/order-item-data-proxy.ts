import { Injectable } from '@angular/core';
import { HttpDataProxy } from './http-data-proxy-base';
import { OrderItem } from '../../contracts';

@Injectable({ providedIn: 'root' })
export class OrderItemDataProxy extends HttpDataProxy<OrderItem> {
  protected baseUri = '/orderitems';
}


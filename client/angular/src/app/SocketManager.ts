import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { CategoryEventAggregator } from './event-aggregators/category-event-aggregator';
import { CustomerEventAggregator } from './event-aggregators/customer-event-aggregator';
import { InventoryEventAggregator } from './event-aggregators/inventory-event-aggregator';
import { ProductEventAggregator } from './event-aggregators/product-event-aggregator';
import { OrderEventAggregator } from './event-aggregators/order-event-aggregator';
import { OrderItemEventAggregator } from './event-aggregators/order-item-event-aggregator';

@Injectable({ providedIn: 'root' })
export class SocketManager {
  private socket;
  private functionMaps = {};
  constructor(
    protected categoryEventAggregator: CategoryEventAggregator,
    protected customerEventAggregator: CustomerEventAggregator,
    protected inventoryEventAggregator: InventoryEventAggregator,
    protected productEventAggregator: ProductEventAggregator,
    protected orderEventAggregator: OrderEventAggregator,
    protected orderItemEventAggregator: OrderItemEventAggregator
  ) {
    this.functionMaps = buildFunctionMaps();
    this.socket = io();
    const self = this;
    this.socket.on('serverchange', function(msg) {
      console.log('msg', msg);
      self.functionMaps[msg.type][msg.route].publish(msg.data);
    });

    function buildFunctionMaps() {
      return {
        insert: {
          categories: categoryEventAggregator.remoteInsert,
          customers: customerEventAggregator.remoteInsert,
          inventoryItems: inventoryEventAggregator.remoteInsert,
          products: productEventAggregator.remoteInsert,
          orders: orderEventAggregator.remoteInsert,
          orderItems: orderItemEventAggregator.remoteInsert
        },
        update: {
          categories: categoryEventAggregator.remoteUpdate,
          customers: customerEventAggregator.remoteUpdate,
          inventoryItems: inventoryEventAggregator.remoteUpdate,
          products: productEventAggregator.remoteUpdate,
          orders: orderEventAggregator.remoteUpdate,
          orderItems: orderItemEventAggregator.remoteUpdate
        },
        destroy: {
          categories: categoryEventAggregator.remoteDelete,
          customers: customerEventAggregator.remoteDelete,
          inventoryItems: inventoryEventAggregator.remoteDelete,
          products: productEventAggregator.remoteDelete,
          orders: orderEventAggregator.remoteDelete,
          orderItems: orderItemEventAggregator.remoteDelete
        }
      };
    }
  }
}

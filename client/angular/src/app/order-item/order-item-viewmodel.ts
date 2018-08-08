import { EntityViewModelBase } from '../entity-view-model-base';
import { Product, OrderItem } from '../contracts';
import { Injectable } from '@angular/core';
import { OrderItemService } from '../services/order-item.service';

@Injectable({ providedIn: 'root' })
export class OrderItemViewModel extends EntityViewModelBase<OrderItem> {

  constructor(
    private orderItemService: OrderItemService,
    private products: Product[],
    orderItem: OrderItem) {
    super(orderItemService);
    this.CurrentEntity = orderItem;
  }

  public get canDelete(): boolean {
    return this.orderItemService.canDelete(this.CurrentEntity);
  }

  public get canSubmit(): boolean {
    return this.orderItemService.canSubmit(this.CurrentEntity);
  }

  public get canShip(): boolean {
    return this.orderItemService.canShip(this.CurrentEntity);
  }

  public submit(): Promise<boolean> {
    if (this.canSubmit) {
      return this.handle(() => {
        return this.orderItemService.submit(this.CurrentEntity.id);
      });
    }
  }

  public ship(): Promise<boolean> {
    if (this.canShip) {
      return this.handle(() => {
        return this.orderItemService.ship(this.CurrentEntity.id);
      });
    }
  }

  public get productName(): string {
    if (this.products && !this.isNew) {
      return this.products.find(p => p.id === this.CurrentEntity.productId).name;
    }
    return null;
  }
}

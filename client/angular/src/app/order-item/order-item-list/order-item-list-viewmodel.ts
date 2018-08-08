import { ListViewModelBase } from '../../list-view-model-base';
import { OrderItem } from '../../contracts';
import { OrderItemService } from '../../services/order-item.service';
import { ProductListViewModel } from '../../product/product-list/product-list-viewmodel';
import { Injectable } from '@angular/core';
import { OrderItemViewModel } from '../order-item-viewmodel';

@Injectable({ providedIn: 'root' })
export class OrderItemListViewModel extends ListViewModelBase<OrderItem> {

  constructor(
    protected service: OrderItemService,
    private productsVM: ProductListViewModel) {
      super(service);
  }

  public items: OrderItemViewModel[];

  public get isBusy() {
    return super['isBusy'] ||
      this.productsVM.isBusy ||
      this.items.some(vm => vm.isBusy);
  }

  public async loadDataFor(orderId: string): Promise<boolean> {
    const results = await Promise.all
    ([
      super.handle(() => this.service.getByOrder(orderId)),
      this.productsVM.loadData()
    ]);
    this.items = this.data.map(i => new OrderItemViewModel(this.service, this.productsVM.data, i));
    return results.every(r => r === true);
  }

  public async destroy(id: string): Promise<boolean> {
    const result = await super.destroy(id);
    if (result) {
      this.items = [...this.items.filter(vm => vm.id !== id)];
    }
    return result;
  }

  public async submitAllSubmittable(): Promise<boolean> {
    const submittableItems = this.data.filter(i => this.service.canSubmit(i));
    const vms = submittableItems.map(i => this.items.find(vm => vm.id === i.id));
    const results = await Promise.all(vms.map(vm => vm.submit()));
    return results.every(result => result === true);
  }
}


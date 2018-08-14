import { OnInit, Component } from '@angular/core';
import { InventoryListViewModel } from './inventory-list-viewmodel';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  providers: [InventoryListViewModel]
})
export class InventoryListComponent implements OnInit {

  public viewModel: InventoryListViewModel;

  constructor(vm: InventoryListViewModel) {
    this.viewModel = vm;
  }

  public ngOnInit() {
    this.viewModel.loadData();
  }
}

// import { OnInit, Component } from '@angular/core';
// import { InventoryListViewModel } from './inventory-list-viewmodel';
// import { EventAggregator } from '../../event-aggregator';
// import { OrderItem, InventoryItem } from '../../contracts';
// import { Subscription } from '../../../../node_modules/rxjs';

// @Component({
//   selector: 'app-inventory-list',
//   templateUrl: './inventory-list.component.html',
//   styleUrls: ['./inventory-list.component.css'],
//   // providers: [InventoryListViewModel]
// })
// export class InventoryListComponent implements OnInit {

//   private orderItemUpdateSubscription: Subscription;

//   constructor(
//     private eventAggregator: EventAggregator<OrderItem>,
//     private vm: InventoryListViewModel) {
//       debugger;
//       this.onOrderItemChanged = this.onOrderItemChanged.bind(this);
//       this.orderItemUpdateSubscription = this.eventAggregator.update.subscribe(this.onOrderItemChanged);
//   }

//   private onOrderItemChanged(orderItem: OrderItem): void {
//     this.vm.loadData();
//   }

//   public ngOnInit() {
//     this.vm.loadData();
//   }

//   // tslint:disable-next-line:use-life-cycle-interface
//   public async ngOnDestroy(): Promise<void> {
//     this.orderItemUpdateSubscription.unsubscribe();
//   }
// }

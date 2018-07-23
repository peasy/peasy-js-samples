import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './app/customer/customer-list/customer-list.component';
import { OrderListComponent } from './app/order/order-list/order-list.component';

const Routes: Routes = [
  { path: 'customers', component: CustomerListComponent },
  { path: 'orders', component: OrderListComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(Routes)]
})
export class AppRoutingModule {
}

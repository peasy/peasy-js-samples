import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './app/customer/customer-list/customer-list.component';
import { OrderListComponent } from './app/order/order-list/order-list.component';
import { CustomerDetailComponent } from './app/customer/customer-detail/customer-detail.component';
import { CategoryDetailComponent } from './app/category/category-detail/category-detail.component';

const Routes: Routes = [
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: 'customers/:id', component: CustomerDetailComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'categories/:id', component: CategoryDetailComponent },
  // { path: 'categories', component: CustomerListComponent },
  { path: 'orders', component: OrderListComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(Routes)]
})
export class AppRoutingModule {
}

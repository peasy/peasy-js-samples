import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './app/customer/customer-list/customer-list.component';
import { OrderListComponent } from './app/order/order-list/order-list.component';
import { CustomerDetailComponent } from './app/customer/customer-detail/customer-detail.component';
import { CategoryDetailComponent } from './app/category/category-detail/category-detail.component';
import { CategoryListComponent } from './app/category/category-list/category-list.component';
import { ProductDetailComponent } from './app/product/product-detail/product-detail.component';
import { ProductListComponent } from './app/product/product-list/product-list.component';
import { InventoryDetailComponent } from './app/inventory/inventory-detail/inventory-detail.component';
import { InventoryListComponent } from './app/inventory/inventory-list/inventory-list.component';
import { OrderDetailComponent } from './app/order/order-detail/order-detail.component';

const Routes: Routes = [
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: 'customers/:id', component: CustomerDetailComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'categories/:id', component: CategoryDetailComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'inventory/:id', component: InventoryDetailComponent },
  { path: 'inventory', component: InventoryListComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/:id', component: OrderDetailComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(Routes)]
})
export class AppRoutingModule {
}

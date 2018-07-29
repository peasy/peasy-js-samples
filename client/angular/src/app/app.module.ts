import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { InventoryDetailComponent } from './inventory/inventory-detail/inventory-detail.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { OrderItemDetailComponent } from './order-item/order-item-detail/order-item-detail.component';
import { OrderItemListComponent } from './order-item/order-item-list/order-item-list.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    OrderDetailComponent,
    OrderListComponent,
    CategoryDetailComponent,
    CategoryListComponent,
    ProductDetailComponent,
    ProductListComponent,
    InventoryDetailComponent,
    InventoryListComponent,
    OrderItemDetailComponent,
    OrderItemListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

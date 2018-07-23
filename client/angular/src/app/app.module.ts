import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerDetailComponent
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

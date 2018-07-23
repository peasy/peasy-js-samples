import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './app/customer/customer-list/customer-list.component';

const Routes: Routes = [
  { path: 'customers', component: CustomerListComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(Routes)]
})
export class AppRoutingModule {
}

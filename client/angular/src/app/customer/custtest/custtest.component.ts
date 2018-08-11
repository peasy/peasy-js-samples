import { Component, OnInit } from '@angular/core';
import { CustomerDetailViewModel } from '../customer-detail/customer-detail-viewmodel';
import { ActivatedRoute } from '@angular/router';
import { ViewModelArgs, Customer } from '../../contracts';
import { EventAggregator } from '../../event-aggregator';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-custtest',
  templateUrl: './custtest.component.html',
  styleUrls: ['./custtest.component.css'],
  providers: [CustomerDetailViewModel]
})
export class CusttestComponent implements OnInit {

  private updateSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventAggregator: EventAggregator<Customer>,
    public viewModel: CustomerDetailViewModel) {
      this.onCustomerChanged = this.onCustomerChanged.bind(this);
      this.updateSubscription = this.eventAggregator.update.subscribe(this.onCustomerChanged);
    }

  private onCustomerChanged(customer: Customer): void {
    this.viewModel.loadData({
      entity: customer
    } as ViewModelArgs<Customer>);
  }

  ngOnInit() {
    let customerId = this.route.snapshot.params['id'];
    if (customerId.toLowerCase() === 'new') { customerId = null; }
    this.viewModel.loadData({
      entityID: customerId
    } as ViewModelArgs<Customer>);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  public async ngOnDestroy(): Promise<void> {
    console.log('DESTORYING COMPONENT');
    this.updateSubscription.unsubscribe();
  }

}

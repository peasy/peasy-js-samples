import { Component, OnInit } from '@angular/core';
import ordersDotCom from '../../../../../businessLogic.js';
import { Customer } from '../../customer.js';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('ORDERS DOT COM', ordersDotCom);
    const command = ordersDotCom.services.customerService.getAllCommand();
    command.execute((err, result) => {
      console.log('ERROR', err);
      console.log('RESULT', result);
      const customers: Customer[] = result.value.map(c => {
        return  { id: c.id };
      });
    });
  }

}

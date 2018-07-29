import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemListComponent } from './order-item-list.component';

describe('OrderItemListComponent', () => {
  let component: OrderItemListComponent;
  let fixture: ComponentFixture<OrderItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

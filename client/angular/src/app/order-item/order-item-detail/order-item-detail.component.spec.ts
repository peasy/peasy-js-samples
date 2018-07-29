import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemDetailComponent } from './order-item-detail.component';

describe('OrderItemDetailComponent', () => {
  let component: OrderItemDetailComponent;
  let fixture: ComponentFixture<OrderItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

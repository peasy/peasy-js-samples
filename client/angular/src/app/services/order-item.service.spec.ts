import { TestBed, inject } from '@angular/core/testing';

import { OrderItemService } from './order-item.service';

describe('OrderItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderItemService]
    });
  });

  it('should be created', inject([OrderItemService], (service: OrderItemService) => {
    expect(service).toBeTruthy();
  }));
});

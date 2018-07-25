import { TestBed, inject } from '@angular/core/testing';

import { ProductServiceService } from './product-service.service';

describe('ProductServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductServiceService]
    });
  });

  it('should be created', inject([ProductServiceService], (service: ProductServiceService) => {
    expect(service).toBeTruthy();
  }));
});

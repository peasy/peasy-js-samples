import { TestBed, inject } from '@angular/core/testing';

import { InventoryService } from './inventory.service';

describe('Inventory.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryService]
    });
  });

  it('should be created', inject([InventoryService], (service: InventoryService) => {
    expect(service).toBeTruthy();
  }));
});

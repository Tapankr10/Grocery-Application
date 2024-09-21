import { TestBed } from '@angular/core/testing';

import { GroceryStoreService } from './grocerystore.service';

describe('GroceryStoreService', () => {
  let service: GroceryStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroceryStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

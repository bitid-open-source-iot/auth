import { TestBed } from '@angular/core/testing';

import { TipsAndUpdatesService } from './tips-and-updates.service';

describe('TipsAndUpdatesService', () => {
  let service: TipsAndUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipsAndUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

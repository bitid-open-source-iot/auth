import { TestBed } from '@angular/core/testing';

import { ScopesService } from './scopes.service';

describe('ScopesService', () => {
  let service: ScopesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScopesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

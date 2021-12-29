import { TestBed, inject } from '@angular/core/testing';

import { FormerrorService } from './formerror.service';

describe('FormerrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormerrorService]
    });
  });

  it('should be created', inject([FormerrorService], (service: FormerrorService) => {
    expect(service).toBeTruthy();
  }));
});

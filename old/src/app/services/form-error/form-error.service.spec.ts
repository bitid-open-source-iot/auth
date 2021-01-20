import { TestBed, inject } from '@angular/core/testing';

import { FormErrorService } from './form-error.service';

describe('FormErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormErrorService]
    });
  });

  it('should be created', inject([FormErrorService], (service: FormErrorService) => {
    expect(service).toBeTruthy();
  }));
});

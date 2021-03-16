import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopesFilterDialog } from './filter.dialog';

describe('ScopesFilterDialog', () => {
  let component: ScopesFilterDialog;
  let fixture: ComponentFixture<ScopesFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScopesFilterDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopesFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

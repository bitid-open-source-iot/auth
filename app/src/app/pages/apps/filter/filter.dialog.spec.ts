import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsFilterDialog } from './filter.dialog';

describe('AppsFilterDialog', () => {
  let component: AppsFilterDialog;
  let fixture: ComponentFixture<AppsFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppsFilterDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

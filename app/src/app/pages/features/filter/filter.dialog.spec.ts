import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesFilterDialog } from './filter.dialog';

describe('FeaturesFilterDialog', () => {
  let component: FeaturesFilterDialog;
  let fixture: ComponentFixture<FeaturesFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturesFilterDialog]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsAndUpdatesFilterDialog } from './filter.dialog';

describe('TipsAndUpdatesFilterDialog', () => {
  let component: TipsAndUpdatesFilterDialog;
  let fixture: ComponentFixture<TipsAndUpdatesFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipsAndUpdatesFilterDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsAndUpdatesFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

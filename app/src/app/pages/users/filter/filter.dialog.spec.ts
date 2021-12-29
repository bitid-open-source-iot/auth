import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokensFilterDialog } from './filter.dialog';

describe('TokensFilterDialog', () => {
  let component: TokensFilterDialog;
  let fixture: ComponentFixture<TokensFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokensFilterDialog]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokensFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

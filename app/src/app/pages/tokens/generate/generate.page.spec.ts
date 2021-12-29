import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokensGeneratePage } from './generate.page';

describe('TokensGeneratePage', () => {
  let component: TokensGeneratePage;
  let fixture: ComponentFixture<TokensGeneratePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokensGeneratePage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokensGeneratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

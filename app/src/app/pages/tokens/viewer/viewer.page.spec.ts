import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokensViewerPage } from './viewer.page';

describe('TokensViewerPage', () => {
  let component: TokensViewerPage;
  let fixture: ComponentFixture<TokensViewerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokensViewerPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokensViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

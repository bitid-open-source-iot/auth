import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenViewerPage } from './viewer.page';

describe('TokenViewerPage', () => {
  let component: TokenViewerPage;
  let fixture: ComponentFixture<TokenViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenViewerPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

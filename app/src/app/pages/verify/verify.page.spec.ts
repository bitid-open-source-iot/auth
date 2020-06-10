import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPage } from './verify.page';

describe('VerifyPage', () => {
  let component: VerifyPage;
  let fixture: ComponentFixture<VerifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

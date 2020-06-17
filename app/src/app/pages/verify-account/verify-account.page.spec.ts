import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAccountPage } from './verify-account.page';

describe('VerifyAccountPage', () => {
  let component: VerifyAccountPage;
  let fixture: ComponentFixture<VerifyAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyAccountPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

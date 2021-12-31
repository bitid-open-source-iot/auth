import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRemovePage } from './remove.page';

describe('AccountRemovePage', () => {
  let component: AccountRemovePage;
  let fixture: ComponentFixture<AccountRemovePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountRemovePage]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRemovePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

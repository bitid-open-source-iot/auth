import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAccountPage } from './remove-account.page';

describe('RemoveAccountPage', () => {
  let component: RemoveAccountPage;
  let fixture: ComponentFixture<RemoveAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveAccountPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

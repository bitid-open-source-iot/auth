import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsPage } from './apps.page';

describe('AppsPage', () => {
  let component: AppsPage;
  let fixture: ComponentFixture<AppsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

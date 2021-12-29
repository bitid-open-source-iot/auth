import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDialog } from './accept.dialog';

describe('AcceptDialog', () => {
  let component: AcceptDialog;
  let fixture: ComponentFixture<AcceptDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

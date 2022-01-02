import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribersEditorDialog } from './editor.dialog';

describe('SubscribersEditorDialog', () => {
  let component: SubscribersEditorDialog;
  let fixture: ComponentFixture<SubscribersEditorDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribersEditorDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribersEditorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

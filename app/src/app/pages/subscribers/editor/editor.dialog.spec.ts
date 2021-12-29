import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditorDialog } from './editor.dialog';

describe('UserEditorDialog', () => {
  let component: UserEditorDialog;
  let fixture: ComponentFixture<UserEditorDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditorDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

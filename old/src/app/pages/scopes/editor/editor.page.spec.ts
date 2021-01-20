import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeEditorPage } from './editor.page';

describe('ScopeEditorPage', () => {
  let component: ScopeEditorPage;
  let fixture: ComponentFixture<ScopeEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopeEditorPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

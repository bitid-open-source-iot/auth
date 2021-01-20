import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFeatureEditorPage } from './editor.page';

describe('AppFeatureEditorPage', () => {
  let component: AppFeatureEditorPage;
  let fixture: ComponentFixture<AppFeatureEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFeatureEditorPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFeatureEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

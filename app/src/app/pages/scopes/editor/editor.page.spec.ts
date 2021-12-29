import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopesEditorPage } from './editor.page';

describe('ScopesEditorPage', () => {
  let component: ScopesEditorPage;
  let fixture: ComponentFixture<ScopesEditorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScopesEditorPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopesEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

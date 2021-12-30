import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEditorPage } from './editor.page';

describe('AppsEditorPage', () => {
  let component: AppsEditorPage;
  let fixture: ComponentFixture<AppsEditorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppsEditorPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

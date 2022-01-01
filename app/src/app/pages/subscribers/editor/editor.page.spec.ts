import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribersEditorPage } from './editor.page';

describe('SubscribersEditorPage', () => {
  let component: SubscribersEditorPage;
  let fixture: ComponentFixture<SubscribersEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribersEditorPage]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribersEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
